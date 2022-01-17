const express = require('express') 
const router = express.Router()
const { auth } = require("../middlewares/authentication");
const { admin } = require("../middlewares/admin");

const productController = require('../controllers/productController')

router.get("/", productController.getAllProducts);

router.get("/count", productController.getProductsCount);

router.get("/active", productController.getActiveProducts);

router.get("/inactive", [auth, admin], productController.getInactiveProducts);

router.post("/", [auth, admin], productController.createProduct); 

router.get("/:id", productController.getOneProduct);

router.delete("/:id", [auth, admin], productController.deleteProduct);

router.put("/:id", [auth, admin], productController.editProduct);

router.put("/:id/status", [auth, admin], productController.changeProductStatus);



module.exports = router