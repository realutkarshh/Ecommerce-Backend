const router = require("express").Router();
const orderController = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAdmin,
} = require("../middleware/auth");

// CREATE ORDER
router.post("/", verifyToken, orderController.createOrder);

// UPDATE ORDER STATUS
router.put("/:id", verifyAdmin, orderController.updateOrderStatus);

// DELETE ORDER
router.delete("/:id", verifyAdmin, orderController.deleteOrder);

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getUserOrders);

// GET ALL ORDERS (Admin)
router.get("/", verifyAdmin, orderController.getAllOrders);

module.exports = router;
