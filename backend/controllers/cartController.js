const Cart = require("../models/Cart");

/**
 * ADD TO CART
 * - If product already exists → increase quantity
 * - Else → create new cart item
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // IMPORTANT: must come from auth middleware

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId,
        productId,
        quantity: quantity || 1
      });

      await cartItem.save();
    }

    res.status(201).json({
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


/**
 * GET USER CART
 * - Returns only logged-in user's cart
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.find({ userId })
      .populate("productId");

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


/**
 * REMOVE SINGLE CART ITEM
 * - Secure: ensures user can only delete own item
 */
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      message: "Cart item removed"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


/**
 * CLEAR CART AFTER PAYMENT
 * - Used after order success / payment success
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteMany({ userId });

    res.status(200).json({
      message: "Cart cleared successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};