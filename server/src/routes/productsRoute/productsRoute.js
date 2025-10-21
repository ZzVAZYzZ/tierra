const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require("../../controllers/products.controller");
const { validateAccessToken } = require("../../middlewares/validateAccesstoken");
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadImage');

router.route('/products/add').post(validateAccessToken,auth(["admin"]),upload.array('images', 5),addProduct);
router.route('/products/:id').put(validateAccessToken,auth(["admin"]),updateProduct);
router.route('/products/:id').delete(validateAccessToken,auth(["admin"]),deleteProduct);
router.route('/products/:id').get(validateAccessToken,auth(["admin"]),getProductById);
router.get('/products', getAllProducts);

module.exports = router;