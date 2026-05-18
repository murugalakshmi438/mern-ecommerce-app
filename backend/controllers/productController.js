const Product = require("../models/Product");


// ADD PRODUCT
exports.addProduct = async (req, res) => {

  try {

    const {
      title,
      price,
      image,
      stock,
      category
    } = req.body;

    const newProduct = new Product({
      title,
      price,
      image,
      stock,
      category
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};




// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};




// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};




// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {

  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};