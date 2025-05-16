const mongoose = require("mongoose");

/* 
This is the Order Schema, it will contain the orders of a particular user
*/

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: String,
        quantity: Number
      }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
