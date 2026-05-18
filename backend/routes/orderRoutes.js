const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getUserOrders,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrders);

module.exports = router;