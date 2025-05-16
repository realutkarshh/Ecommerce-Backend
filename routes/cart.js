const router = require("express").Router();
const Cart = require("../models/Cart");
const cartController = require("../controllers/cartController");
const { verifyToken, verifyTokenAndAuthorization, verifyAdmin } = require("../middleware/auth");

// CREATE CART | Method:POST /api/cart
router.post("/", verifyToken, cartController.createCart);

// UPDATE CART | Method:PUT  /api/cart/[id]
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);

// DELETE CART | Method:DELETE /api/cart/[id]
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);

// GET USER CART | Method:GET /api/cart/find/[userId]
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getUserCart);

// GET ALL CARTS (Admin only) | Method:GET /api/cart
router.get("/", verifyAdmin, cartController.getAllCarts);

module.exports = router;
