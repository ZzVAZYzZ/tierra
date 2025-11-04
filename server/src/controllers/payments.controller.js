require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment');
const Order = require('../models/orders');

const createPaymentIntent = async (req, res) => {
    try {
        // NHẬN THÊM CÁC THÔNG TIN KHÁCH HÀNG TỪ FRONTEND
        const { amount, name, email, addressLine1, city, order_id } = req.body;

        if (!amount || !name || !email || !addressLine1 || !city || !order_id) {
            return res.status(400).json({ message: "Missing required customer details (amount, name, email, address, or city)" });
        }

        // Tạo Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "vnd",
            description: "Thanh toán sản phẩm demo",
            automatic_payment_methods: { enabled: true },

            // 💡 CẬP NHẬT: THÊM DỮ LIỆU TÙY CHỈNH VÀO METADATA
            metadata: {
                customer_name: name,
                customer_email: email,
                customer_address_line1: addressLine1,
                customer_city: city,
                // Bạn cũng có thể thêm ID đơn hàng ở đây nếu có
                order_id: order_id,
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Lỗi tạo PaymentIntent:", error.message);
        res.status(500).json({ message: error.message });
    }
}

// Hàm này không cần thay đổi logic, nhưng chúng ta có thể in ra metadata
const paymentResult = async (req, res) => {
    // Frontend chỉ gửi về một phần của paymentIntent (thường chỉ có id và status)
    const { paymentIntent } = req.body;

    if (!paymentIntent || !paymentIntent.id) {
        return res.status(400).json({ message: "Missing PaymentIntent ID" });
    }

    try {
        // 1. DÙNG STRIPE API ĐỂ LẤY THÔNG TIN CHI TIẾT CỦA PAYMENT INTENT
        const fullPaymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntent.id
        );

        // 2. TRUY CẬP METADATA ĐÃ ĐƯỢC LƯU TRONG HÀM createPaymentIntent
        const customerInfo = fullPaymentIntent.metadata;
        // console.log(fullPaymentIntent);

        console.log("💳 Payment completed:", fullPaymentIntent.id);
        console.log("   Trạng thái:", fullPaymentIntent.status);

        // KIỂM TRA ĐẢM BẢO THANH TOÁN THÀNH CÔNG TRƯỚC KHI XỬ LÝ
        if (fullPaymentIntent.status === 'succeeded') {
            const newPayment = new Payment({
                payment_id: fullPaymentIntent.id,
                order_id: customerInfo.order_id,
                amount: fullPaymentIntent.amount,
                currency: fullPaymentIntent.currency,
                status: fullPaymentIntent.status,
                paymentType: "CreditCard", // hoặc "QRCode" tùy bạn set ở FE
                payment_method: fullPaymentIntent.payment_method,
                description: fullPaymentIntent.description,
                customer_name: customerInfo.customer_name,
                customer_email: customerInfo.customer_email,
                customer_address: `${customerInfo.customer_address_line1}, ${customerInfo.customer_city}`,
            });

            await newPayment.save();



            console.log("✅ Payment saved successfully to MongoDB");

            const updatedOrder = await Order.findOneAndUpdate(
                { order_id: customerInfo.order_id },
                { status: "paid" },
                { new: true } // trả về document sau khi update
            );

            if (updatedOrder) {
                console.log(`✅ Order ${updatedOrder.order_id} updated to status: ${updatedOrder.status}`);
            } else {
                console.warn(`⚠️ Không tìm thấy Order với order_id = ${customerInfo.order_id}`);
            }

        } else {
            console.log("⚠️ Thanh toán chưa thành công:", fullPaymentIntent.status);
        }



        res.send({
            message: "Server successfully processed payment result",
            status: fullPaymentIntent.status,
            paymentId: fullPaymentIntent.id,
        });

    } catch (error) {
        console.error("❌ Lỗi khi lưu Payment:", error.message);
        res.status(500).json({ message: "Failed to process payment result." });
    }
}

module.exports = { createPaymentIntent, paymentResult }