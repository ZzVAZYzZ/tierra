const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderDetailSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit_price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    user_id: {
      type: String,
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: [orderDetailSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  {
    _id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual("order_id").get(function () {
  return this._id;
});

module.exports = mongoose.model("Order", orderSchema);
