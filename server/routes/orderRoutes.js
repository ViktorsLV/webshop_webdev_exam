const express = require('express') 
const router = express.Router()
const { auth } = require("../middlewares/authentication");
const orderController = require('../controllers/orderController')

/* TODO: add admin permissions, AUTH routes */
router.get("/", auth,  orderController.getOrders); // TODO: admin ? 

router.get("/myOrders", auth, orderController.getMyOrders); // get current users orders 

router.post("/", auth, orderController.createOrder); 

router.get("/:id", auth, orderController.getOrderById);

router.put("/:id/pay", auth, orderController.updateOrderToPaid);

router.put("/:id/deliver", auth, orderController.updateOrderToDelivered);

module.exports = router