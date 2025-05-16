const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();

    // Send order confirmation email
    await sendEmail(
      req.body.email,
      "Order Confirmation",
      `Hi,\n\nYour order with ID ${saved._id} has been placed successfully. We will notify you as it progresses.\n\nThank you for shopping with us!`
    );

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Send email on order status update
    if (updated && updated.email) {
      await sendEmail(
        updated.email,
        "Order Status Updated",
        `Hi,\n\nYour order #${updated._id} has been updated. New Status: ${updated.status || "Updated"}.\n\nRegards,\nTeam`
      );
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER ORDERS (Get the Orders of a particular user)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL ORDERS (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
