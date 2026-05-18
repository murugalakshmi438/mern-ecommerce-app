const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

const {
  authMiddleware
} = require("../middleware/authMiddleware");



router.post(
  "/add",
  authMiddleware,
  addToCart
);

router.get(
  "/",
  authMiddleware,
  getCart
);

router.delete(
  "/clear",
  authMiddleware,
  clearCart
);

router.delete(
  "/:id",
  authMiddleware,
  removeCartItem
);



module.exports = router;