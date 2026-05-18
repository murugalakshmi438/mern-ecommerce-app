const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    console.log("ORDER BODY:", req.body);

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};