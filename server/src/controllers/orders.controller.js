const asyncHandler = require('express-async-handler');
const Order = require('../models/orders');
const Product = require('../models/products');
const { sequelize } = require('../databases/mysql/mysqlConnect');

// @desc Create a new order
// @route POST /api/orders/create
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    const { shipping_address, orderDetails } = req.body;
    const user = req.user;

    if (!user || !user.user_id) {
        res.status(401);
        throw new Error('Unauthorized. Missing user info.');
    }

    const user_id = user.user_id;

    if (!shipping_address || !orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
        res.status(400);
        throw new Error('Missing required fields or invalid orderDetails.');
    }

    // ✅ Lấy danh sách product_id từ orderDetails
    const productIds = orderDetails.map(item => item.product_id);

    // ✅ Tìm các sản phẩm có ID trong danh sách (MySQL)
    const products = await Product.findAll({
        where: { product_id: productIds },
    });



    if (products.length !== productIds.length) {
        res.status(400);
        throw new Error('One or more products not found.');
    }

    // ✅ Tạo map nhanh để tra sản phẩm
    const productMap = new Map();
    products.forEach(p => productMap.set(p.product_id, p));

    let total_amount = 0;
    const validatedOrderDetails = [];

    for (const item of orderDetails) {
        const product = productMap.get(item.product_id);

        if (!product) {
            res.status(404);
            throw new Error(`Product ${item.product_id} not found`);
        }

        const quantity = Number(item.quantity);
        if (quantity <= 0) {
            res.status(400);
            throw new Error(`Invalid quantity for product ${item.product_id}`);
        }

        if (product.stock_quantity < quantity) {
            res.status(400);
            throw new Error(`Not enough stock for product ${product.name}`);
        }

        // ✅ Tính giá thực tế
        const unitPrice = Number(product.price);
        const discount = product.discount_price ? Number(product.discount_price) : 0;
        const effectivePrice = unitPrice - discount;
        const lineTotal = effectivePrice * quantity;
        total_amount += lineTotal;

        // ✅ Tự động trừ tồn kho
        product.stock_quantity -= quantity;
        await product.save();

        // ✅ Gom dữ liệu lại cho Mongoose
        validatedOrderDetails.push({
            product_id: product.product_id,
            product_name: product.name,
            quantity,
            unit_price: unitPrice,
            discount: discount,
        });
    }

    try {
        const order = new Order({
            user_id,
            shipping_address,
            total_amount,
            orderDetails: validatedOrderDetails,
        });

        await order.validate();
        console.log("✅ Order hợp lệ");

        const newOrder = await order.save();
        console.log("✅ Order lưu thành công:", newOrder);

        res.status(201).json({ message: "Order successfully!", order: newOrder });
    } catch (err) {
        console.error("❌ Lỗi khi tạo Order:", err);
        res.status(500).json({ message: err.message });
    }

});


// @desc Get orders by status
// @route GET /api/orders/status/:status
// @access Public
const getOrdersByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;

    const validStatuses = ['pending', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid order status');
    }

    const orders = await Order.find({ status });

    res.status(200).json(orders);
});

// @desc Get orders by user_id
// @route GET /api/orders/user/:user_id
// @access Public 
const getOrdersByUserId = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        res.status(400);
        throw new Error('User ID is required');
    }

    const orders = await Order.find({ user_id });

    res.status(200).json(orders);
});

// @desc Get order by order_id
// @route GET /api/orders/:order_id
// @access Public
const getOrderById = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    const order = await Order.findById(order_id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    res.status(200).json(order);
});


module.exports = { createOrder, getOrdersByStatus, getOrdersByUserId, getOrderById };