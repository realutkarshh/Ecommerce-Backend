const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("../middleware/auth");
const wishlistController = require('../controllers/wishlistController');

// ADD TO WISHLIST | Method:POST /api/wishlist 
router.post("/", verifyToken, wishlistController.addItemToWishlist);

// UPDATE WISHLIST | Method:PUT /api/wishlist/[wishlistId]
router.put("/:id", verifyToken, wishlistController.updateWishlist);

// DELETE WISHLIST | Method:DELETE /api/wishlist/[wishlistId]
router.delete("/:id", verifyToken, wishlistController.deleteWishlist);

// GET USER WISHLIST | Method:GET /api/wishlist/find/[userId]
router.get("/find/:userId", verifyToken, wishlistController.getWishlistOfUser);

module.exports = router;
