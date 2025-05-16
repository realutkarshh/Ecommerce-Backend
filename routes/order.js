const router = require("express").Router();
const orderController = require("../controllers/orderController");
const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/auth");

// CREATE ORDER | Method:POST /api/order with body {order details as per schema}
router.post("/", verifyToken, orderController.createOrder);

// UPDATE ORDER STATUS | Method:PUT /api/order/[orderId] with the field as body that you want to update
router.put("/:id", verifyAdmin, orderController.updateOrderStatus);

// DELETE ORDER | Method:DELETE /api/order/[orderId]
router.delete("/:id", verifyAdmin, orderController.deleteOrder);

// GET USER ORDERS | Method:GET /api/order/find/[userId]
router.get("/find/:userId", verifyToken, orderController.getUserOrders);

// GET ALL ORDERS (Admin) | Method:GET /api/order
router.get("/", verifyAdmin, orderController.getAllOrders);

module.exports = router;
