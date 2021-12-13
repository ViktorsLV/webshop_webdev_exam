const express = require('express') 
const router = express.Router()
const { auth } = require("../middlewares/authentication");
const orderController = require('../controllers/orderController')

/* TODO: add admin permissions, AUTH routes */
router.get("/", orderController.getOrders); // TODO: admin ? 

router.post("/myOrders", orderController.getMyOrders); // get current users orders 

router.post("/", auth, orderController.createOrder); 

router.get("/:id", orderController.getOrderById);

router.put("/:id/pay", orderController.updateOrderToPaid);

router.put("/:id/deliver", orderController.updateOrderToDelivered);

module.exports = router