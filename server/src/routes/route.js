const express = require("express");
const router = express.Router();
const usersRoute = require('./usersRoute/usersRoute');
const productsRoute = require('./productsRoute/productsRoute');
const categoriresRoute = require('./categoriesRoute/categoriesRoute');
const ordersRoute = require('./ordersRoute/ordersRoute');
const paymentRoute = require('./paymentRoute/paymentRoute');
const reviewRoute = require('./reviewRoute/reviewRoute');

router.use('/api',usersRoute);
router.use('/api',productsRoute);
router.use('/api',categoriresRoute);
router.use('/api',ordersRoute);
router.use('/api',paymentRoute);
router.use('/api',reviewRoute);

module.exports = router;