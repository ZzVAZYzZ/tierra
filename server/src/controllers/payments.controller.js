require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        // NHẬN THÊM CÁC THÔNG TIN KHÁCH HÀNG TỪ FRONTEND
        const { amount, name, email, addressLine1, city } = req.body; 

        if (!amount || !name || !email || !addressLine1 || !city) {
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
                order_id: "ORD-" + Date.now(), 
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

        console.log("💳 Payment completed:", fullPaymentIntent.id);
        console.log("   Trạng thái:", fullPaymentIntent.status);
        
        // KIỂM TRA ĐẢM BẢO THANH TOÁN THÀNH CÔNG TRƯỚC KHI XỬ LÝ
        if (fullPaymentIntent.status === 'succeeded') {
            console.log("✅ Metadata Khách hàng:", customerInfo);
            
            // **XỬ LÝ ĐƠN HÀNG CỦA BẠN TẠI ĐÂY:**
            // 1. Lưu thông tin đơn hàng vào database (dùng customerInfo).
            // 2. Cập nhật trạng thái sản phẩm, gửi email, v.v.
            console.log(`Lưu đơn hàng cho: ${customerInfo.customer_name} - ${customerInfo.customer_email}`);
        } else {
            console.log("⚠️ Thanh toán không thành công hoặc đang chờ xử lý:", fullPaymentIntent.status);
        }

        res.send({ 
            message: "Server successfully processed payment result",
            status: fullPaymentIntent.status,
            customer: customerInfo // Trả về thông tin khách hàng (tùy chọn)
        });

    } catch (error) {
        console.error("Lỗi khi lấy PaymentIntent chi tiết:", error.message);
        res.status(500).json({ message: "Failed to retrieve full payment intent details." });
    }
}

module.exports = {createPaymentIntent ,paymentResult}