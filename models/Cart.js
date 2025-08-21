// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  sessionId: String,
  productId: String,
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
