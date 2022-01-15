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

// @route   GET /api/products/:id
// @access  Private/Admin
deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove()
      res.status(200).json({message: "product removed successfully"});
    } else {
      res.status(404).json({ message: "Product not found"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// @route   POST /api/products
// @access  Private/Admin
createProduct = async (req, res) => {
  const { name, price, brand, image, category, countInStock, description } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: image || '/images/test.png',
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  })

  try {
    const createdProduct = await product.save()

    if(!createdProduct) {
      throw new Error("Something went wrong, please, try again");
    }
    if (createdProduct) {
      res.status(201).json(createdProduct);
    }

  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getAllProducts,
  deleteProduct,
  getOneProduct,
  createProduct
};
