const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken, verifyTokenAndAuthorization } = require("../middleware/auth");

// ADD TO WISHLIST
router.post("/", verifyToken, async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const saved = await newWishlist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE WISHLIST
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
});

// DELETE WISHLIST
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Wishlist deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER WISHLIST
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
