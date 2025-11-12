const asyncHandler = require('express-async-handler');
const Order = require('../models/orders');
const Product = require('../models/products');
const Stripe = require("stripe");
const ProductImage = require('../models/prodcutImages');
const User = require('../models/users');

// @desc Create a new order
// @route POST /api/orders/create
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    const { shipping_address, orderDetails, payment_method } = req.body;
    const user = req.user;

    if (!user || !user.user_id) {
        res.status(401);
        throw new Error('Unauthorized. Missing user info.');
    }

    const user_id = user.user_id;

    if (!shipping_address || !orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0 || !payment_method) {
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
            payment_method
        });

        await order.validate();
        console.log("✅ Order hợp lệ");

        const newOrder = await order.save();
        console.log("✅ Order lưu thành công:", newOrder);

        res.status(201).json({ message: "Order successfully!", order: newOrder, order_id: newOrder.order_id });
    } catch (err) {
        console.error("❌ Lỗi khi tạo Order:", err);
        res.status(500).json({ message: err.message });
    }

});


const getOrdersByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    let orders;

    const validStatuses = ["created", "paid", "shipping", "completed", "cancelled"];

    // 1. Tìm đơn hàng từ Mongoose
    if (status.toLowerCase() === "all") {
        orders = await Order.find({});
    } else {
        if (!validStatuses.includes(status)) {
            res.status(400);
            throw new Error('Invalid order status. Status must be one of: ' + validStatuses.join(', ') + ' or "all".');
        }
        orders = await Order.find({ status });
    }

    // Nếu không tìm thấy đơn hàng, trả về mảng rỗng
    if (orders.length === 0) {
        return res.status(200).json([]);
    }

    // 2. Chuẩn bị dữ liệu cho quá trình tra cứu
    const ordersArray = orders.map(order => order.toObject());

    // --- BỔ SUNG THÔNG TIN TỔNG HỢP (USER & IMAGE) ---

    // 3. Lấy danh sách duy nhất các user_id và product_id cần tra cứu
    const uniqueUserIds = [...new Set(ordersArray.map(o => o.user_id))];
    const allProductIds = ordersArray.flatMap(o => o.orderDetails.map(d => d.product_id));
    const uniqueProductIds = [...new Set(allProductIds)];


    // 4. Tra cứu thông tin người dùng (Lấy một lần cho tất cả)
    const users = await User.findAll({
        where: { user_id: uniqueUserIds },
        attributes: ['user_id', 'name', 'email']
    });

    const userMap = new Map();
    users.forEach(u => userMap.set(u.user_id, { name: u.name, email: u.email }));

    // 5. Tra cứu ảnh chính (Lấy một lần cho tất cả)
    const mainImages = await ProductImage.findAll({
        where: {
            product_id: uniqueProductIds,
            is_main: true
        },
        attributes: ['product_id', 'image_url']
    });

    const imageMap = new Map();
    mainImages.forEach(img => imageMap.set(img.product_id, img.image_url));

    // 6. Xử lý và Gắn dữ liệu vào từng đơn hàng
    const ordersWithDetails = ordersArray.map(order => {

        // Gắn thông tin người dùng
        const userInfo = userMap.get(order.user_id) || { user_name: 'N/A', user_email: 'N/A' };
        order.user_name = userInfo.name;
        order.user_email = userInfo.email;

        // Gắn ảnh vào chi tiết đơn hàng
        order.orderDetails = order.orderDetails.map(detail => ({
            ...detail,
            product_image: imageMap.get(detail.product_id) || null
        }));

        return order;
    });
    // -----------------------------------------------------------------

    // 7. Trả về danh sách đơn hàng đã được bổ sung
    res.status(200).json(ordersWithDetails);
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

    // 1. Tìm đơn hàng từ Mongoose
    const order = await Order.findOne({ order_id: order_id });

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // 2. Chuẩn bị dữ liệu để xử lý (chuyển Mongoose Document thành Plain JS Object)
    let orderObject = order.toObject();

    // Lấy user_id từ order
    const { user_id } = orderObject;

    // --- BỔ SUNG: TRA CỨU THÔNG TIN NGƯỜI DÙNG (Bước 3.1) ---
    const user = await User.findOne({
        where: { user_id: user_id },
        attributes: ['name', 'email'] // Chỉ lấy các trường cần thiết
    });

    // Kiểm tra và bổ sung thông tin người dùng vào orderObject
    if (user) {
        orderObject.user_name = user.name;
        orderObject.user_email = user.email;
    } else {
        // Xử lý nếu user_id không tìm thấy (trường hợp hiếm)
        orderObject.user_name = 'Người dùng không tồn tại';
        orderObject.user_email = null;
    }
    // -----------------------------------------------------------------

    // 3. Lấy danh sách product IDs từ chi tiết đơn hàng
    const productIds = orderObject.orderDetails.map(detail => detail.product_id);

    // 4. Tìm tất cả ảnh chính (is_main: true) cho các sản phẩm này từ Sequelize
    const mainImages = await ProductImage.findAll({
        where: {
            product_id: productIds,
            is_main: true
        },
        attributes: ['product_id', 'image_url']
    });

    // 5. Tạo Map để tra cứu nhanh ảnh theo product_id
    const imageMap = new Map();
    mainImages.forEach(img => {
        imageMap.set(img.product_id, img.image_url);
    });

    // 6. Gắn image_url vào orderDetails trước khi gửi đi
    orderObject.orderDetails = orderObject.orderDetails.map(detail => ({
        ...detail,
        product_image: imageMap.get(detail.product_id) || null
    }));

    // 7. Trả về dữ liệu đơn hàng đã được bổ sung thông tin ảnh và người dùng
    res.status(200).json(orderObject);
});


module.exports = { createOrder, getOrdersByStatus, getOrdersByUserId, getOrderById };