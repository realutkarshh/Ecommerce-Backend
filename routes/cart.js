const router = require("express").Router();
const Cart = require("../models/Cart");
const cartController = require("../controllers/cartController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// CREATE CART | Method:POST /api/cart
router.post("/", verifyToken, cartController.createCart);

// UPDATE CART | Method:PUT  /api/cart/[id]
router.put("/:id", verifyToken, cartController.updateCart);

// DELETE CART | Method:DELETE /api/cart/[id]
router.delete("/:id", verifyToken, cartController.deleteCart);

// GET USER CART | Method:GET /api/cart/find/[userId]
router.get("/find/:userId", verifyToken, cartController.getUserCart);

// GET ALL CARTS (Admin only) | Method:GET /api/cart
router.get("/", verifyAdmin, cartController.getAllCarts);

module.exports = router;
