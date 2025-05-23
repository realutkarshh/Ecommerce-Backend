const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [{ productId: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
