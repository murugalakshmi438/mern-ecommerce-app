const express = require("express");

const router = express.Router();
const {
  authMiddleware,
  adminMiddleware
} = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");


// ADD PRODUCT
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  addProduct
);


// GET PRODUCTS
router.get("/", getProducts);


// DELETE PRODUCT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);


module.exports = router;