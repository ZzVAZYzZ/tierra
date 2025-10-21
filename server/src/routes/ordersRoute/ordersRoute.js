const express = require("express");
const { createOrder, getOrdersByStatus, getOrdersByUserId, getOrderById } = require("../../controllers/orders.controller");
const { validateAccessToken } = require("../../middlewares/validateAccesstoken");
const {auth} = require('../../middlewares/auth');
const router = express.Router();

router.route('/orders/makeOrder').post(validateAccessToken,auth(["user"]),createOrder);
router.route('/orders/status/:status').get(validateAccessToken,auth(["user"]),getOrdersByStatus);
router.route('/orders/user/:user_id').get(validateAccessToken,auth(["user"]),getOrdersByUserId);
router.route('/orders/:order_id').get(validateAccessToken,auth(["user"]),getOrderById);

module.exports = router;