const { Product } = require("../models/productModel");

// @route   GET /api/products
// @access  Public
getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
    if (!allProducts) res.status(404).json("Products not found");
  } catch (err) {
    res.status(500).json(err);
  }
};

// @route   GET /api/products/:id
// @access  Public
getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found"});
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
};
