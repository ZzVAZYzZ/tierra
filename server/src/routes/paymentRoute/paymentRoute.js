const express = require("express");
const router = express.Router();
const { createPaymentIntent, paymentResult } = require("../../controllers/payments.controller");


router.route('/create-payment-intent').post(createPaymentIntent);

router.route("/payment-result").post(paymentResult);

router.route('/test-qr-scan').get((req, res) => {
    const data = req.query.data;
    const timestamp = req.query.timestamp;
    console.log(data);

    // Trả lời lại cho thiết bị quét
    res.send(`
        <h1>✅ Thành công! Backend đã nhận dữ liệu: ${data}</h1>
        <p>Kiểm tra console của server Express.js.</p>
    `);
});

module.exports = router;