const asyncHandler = require('express-async-handler');
const Product = require('../models/products');
const Category = require('../models/categories');
const ProductImage = require('../models/prodcutImages');
const cloudinary = require('../databases/cloudinary/cloudinaryConnect');

const fs = require('fs');
const {nowVN} = require('../utils/time');

// @desc Add new product
// @route POST /api/products/add
// @access Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    material,
    category_id,
    price,
    discount_price,
    stock_quantity,
    status,
    color,
    main_index,
  } = req.body;

  // input validation
  if (!name || !category_id || !price) {
    res.status(400);
    throw new Error('Name, category_id and price are required.');
  }

  // Check if category exists
  const category = await Category.findByPk(category_id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found.');
  }

  const currentTime = nowVN();

  // Create product
  const newProduct = await Product.create({
    name,
    description,
    category_id,
    price,
    discount_price,
    material,
    color,
    stock_quantity: Number(stock_quantity),
    status: status || 'active',
    created_at: currentTime,
    updated_at: currentTime,
  });

  // Add images if provided cloudinary
  if (req.files && req.files.length > 0) {
    try {
      const uploadResults = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'doana/product_images',
        });


        fs.unlinkSync(file.path);

        uploadResults.push({
          product_id: newProduct.product_id,
          image_url: result.secure_url,
          is_main: Number(main_index) === i, 
        });
      }

      const hasMain = uploadResults.some((img) => img.is_main === true);
      if (!hasMain && uploadResults.length > 0) {
        uploadResults[0].is_main = true;
      }

      await ProductImage.bulkCreate(uploadResults);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500);
      throw new Error('Image upload failed');
    }
  }

  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});

// @desc Update existing product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const {
    name,
    description,
    category_id,
    price,
    discount_price,
    stock_quantity,
    status,
    material,
    main_index,
  } = req.body;

  const product = await Product.findByPk(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  if (category_id) {
    const category = await Category.findByPk(category_id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found.');
    }
  }

  // Update fields if provided
  product.name = name || product.name;
  product.description = description || product.description;
  product.category_id = category_id || product.category_id;
  product.price = price !== undefined ? price : product.price;
  product.discount_price = discount_price !== undefined ? discount_price : product.discount_price;
  product.stock_quantity = stock_quantity !== undefined ? stock_quantity : product.stock_quantity;
  product.status = status || product.status;
  product.material = material || product.material;
  product.updated_at = nowVN();

  await product.save();

  // 4️⃣ Nếu có ảnh mới được upload
  if (req.files && req.files.length > 0) {
    try {
      // 🧹 Xóa ảnh cũ khỏi Cloudinary
      const oldImages = await ProductImage.findAll({ where: { product_id: productId } });

      for (const img of oldImages) {
        if (img.image_url) {
          try {
            const imageName = img.image_url.split('/').pop();
            const publicId = `doana/product_images/${imageName.substring(0, imageName.lastIndexOf('.'))}`;
            await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            console.log(`🗑️ Deleted old image: ${publicId}`);
          } catch (err) {
            console.error('❌ Cloudinary delete error:', err.message);
          }
        }
      }

      // ❌ Xóa record ảnh cũ trong DB
      await ProductImage.destroy({ where: { product_id: productId } });

      // 🆕 Upload ảnh mới lên Cloudinary
      const uploadResults = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'doana/product_images',
        });

        // Xóa file tạm
        fs.unlinkSync(file.path);

        uploadResults.push({
          product_id: product.product_id,
          image_url: result.secure_url,
          is_main: Number(main_index) === i,
        });
      }

      // Nếu không có ảnh nào là main → chọn ảnh đầu tiên
      const hasMain = uploadResults.some((img) => img.is_main === true);
      if (!hasMain && uploadResults.length > 0) {
        uploadResults[0].is_main = true;
      }

      await ProductImage.bulkCreate(uploadResults);
      console.log(`✅ Updated ${uploadResults.length} new images`);
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      res.status(500);
      throw new Error('Image update failed');
    }
  }

  res.status(200).json({
    message: 'Product updated successfully',
    product,
  });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error('Product ID is required');
  }


  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }


  const images = await ProductImage.findAll({ where: { product_id: id } });


  for (const img of images) {
    if (img.image_url) {
      try {

        const imageName = img.image_url.split('/').pop();
        const publicId = `doana/product_images/${imageName.substring(0, imageName.lastIndexOf('.'))}`;

        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        console.log(`🗑️ Deleted image: ${publicId}`);
      } catch (err) {
        console.error('❌ Cloudinary delete error:', err.message);
      }
    }
  }

  await ProductImage.destroy({ where: { product_id: id } }).then(()=>{console.log("xoa record thanh cong!")});

  await product.destroy().then(()=>{console.log("xoa product thanh cong!")});

  res.status(200).json({
    message: '✅ Product and its images deleted successfully',
    productId: id,
    deletedAt: nowVN(),
  });
});

// @desc Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findByPk(productId, {
    include: [
      { model: Category, attributes: ['category_id', 'name'] },
      { model: ProductImage, attributes: ['image_id', 'image_url', 'is_main'] },
    ],
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  res.status(200).json(product);
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Category, attributes: ['category_id', 'name'] },
      { model: ProductImage, attributes: ['image_id', 'image_url', 'is_main'] },
    ],
  });

  res.status(200).json(products);
});

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts
};
