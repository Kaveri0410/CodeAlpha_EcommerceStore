const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  products: [
    {
      name: String,
      price: Number
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
