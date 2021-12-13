const express = require('express') 
const router = express.Router()
const { auth } = require("../middlewares/authentication");

const productController = require('../controllers/productController')

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getOneProduct);

router.post("/", auth, productController.createProduct); /* TODO: ONLY ADMIN */


module.exports = router