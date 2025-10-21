const express = require("express");
const router = express.Router();
const usersRoute = require('./usersRoute/usersRoute');
const productsRoute = require('./productsRoute/productsRoute');
const categoriresRoute = require('./categoriesRoute/categoriesRoute');
const ordersRoute = require('./ordersRoute/ordersRoute');

router.use('/api',usersRoute);
router.use('/api',productsRoute);
router.use('/api',categoriresRoute);
router.use('/api',ordersRoute);

module.exports = router;