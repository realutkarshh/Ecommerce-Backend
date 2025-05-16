const wishlist = require('../models/Wishlist');

//Function to add item to wishlist 
exports.addItemToWishlist = async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const saved = await newWishlist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
}

//Function to update wishlist
exports.updateWishlist = async (req, res) => {
  try {
    const updated = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
}

//Function to delete wishlist 
exports.deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Wishlist deleted");
  } catch (err) {
    res.status(500).json(err);
  }
}

//Function to get wishlist of a user
exports.getWishlistOfUser = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
}
