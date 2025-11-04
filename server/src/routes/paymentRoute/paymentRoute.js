const express = require("express");
const router = express.Router();
const { createPaymentIntent, paymentResult } = require("../../controllers/payments.controller");
const { validateAccessToken } = require("../../middlewares/validateAccesstoken");
const { QRValidateAccessToken } = require('../../middlewares/QRValidateAccessToken');
router.route('/create-payment-intent').post(validateAccessToken, createPaymentIntent);

router.route("/payment-result").post(validateAccessToken, paymentResult);



router.route('/test-qr-scan').get(QRValidateAccessToken, async (req, res) => {
  try {
    // 🔹 Parse dữ liệu query
    const orderData = req.query.data ? JSON.parse(req.query.data) : null;
    const io = req.app.get("io");

    // ⚠️ Validate dữ liệu
    if (!orderData || !orderData.order_id) {
      console.error("❌ Thiếu order_id trong dữ liệu QR:", orderData);

      // Emit thông báo lỗi tới client
      io.emit("paymentStatus", {
        success: false,
        error: "Thiếu order_id trong dữ liệu QR",
      });

      return res.status(400).send(`
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Lỗi xác nhận</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 40px;
                background-color: #fff5f5;
                color: #c53030;
              }
              h2 { font-size: 24px; margin-bottom: 12px; }
              p { font-size: 16px; }
            </style>
          </head>
          <body>
            <h2>❌ Không thể xác nhận thanh toán</h2>
            <p>Thiếu mã đơn hàng (order_id).</p>
            <p>Vui lòng thử lại hoặc quét lại mã QR.</p>
          </body>
        </html>
      `);
    }

    // 🟢 Nếu hợp lệ → xử lý bình thường
    console.log("📲 Order confirmed for:", orderData.order_id);

    io.to(orderData.order_id).emit("paymentStatus", {
      success: true,
      orderId: orderData.order_id,
    });
    console.log("📤 Emitted paymentStatus success to room:", orderData.order_id);

    // ✅ Gửi giao diện cho điện thoại
    res.status(200).send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Thanh toán thành công</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 40px;
              background-color: #f0fff4;
              color: #2f855a;
            }
            h2 { font-size: 24px; margin-bottom: 12px; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>✅ Thanh toán thành công!</h2>
          <p>Cảm ơn bạn, đơn hàng <b>${orderData.order_id}</b> đã được xác nhận.</p>
          <p>Bạn có thể quay lại máy tính để xem kết quả.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("❌ Error during QR scan:", err.message);
    const io = req.app.get("io");

    // Nếu parse JSON lỗi → tạo orderData rỗng để tránh crash
    let orderData = null;
    try {
      orderData = req.query.data ? JSON.parse(req.query.data) : null;
    } catch {
      orderData = null;
    }

    // 🔥 Emit lỗi nếu có order_id
    if (orderData?.order_id) {
      io.to(orderData.order_id).emit("paymentStatus", {
        success: false,
        orderId: orderData.order_id,
        error: err.message,
      });
      console.log("📤 Emitted paymentStatus failed to room:", orderData.order_id);
    } else {
      io.emit("paymentStatus", {
        success: false,
        error: err.message,
      });
    }

    // ❌ Giao diện lỗi cho điện thoại
    res.status(400).send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Thanh toán thất bại</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 40px;
              background-color: #fff5f5;
              color: #c53030;
            }
            h2 { font-size: 24px; margin-bottom: 12px; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>❌ Thanh toán thất bại!</h2>
          <p>${err.message}</p>
          <p>Vui lòng thử lại hoặc kiểm tra kết nối.</p>
        </body>
      </html>
    `);
  }
});



module.exports = router;