const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require("../../controllers/products.controller");
const { validateAccessToken } = require("../../middlewares/validateAccesstoken");
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadImage');

router.route('/products/add').post(upload.array('images', 5),addProduct);
router.route('/products/:id').put(upload.array('images', 5),updateProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').get(getProductById);
router.get('/products', getAllProducts);

module.exports = router;