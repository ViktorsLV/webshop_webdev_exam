const express = require('express') 
const router = express.Router()
const { auth } = require("../middlewares/authentication");
const { admin } = require("../middlewares/admin");

const productController = require('../controllers/productController')

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getOneProduct);

router.get("/count", productController.getProductsCount);

router.delete("/:id", [auth, admin], productController.deleteProduct);

router.put("/:id", [auth, admin], productController.editProduct);

router.post("/", [auth, admin], productController.createProduct); 


module.exports = router