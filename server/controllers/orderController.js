const { Order } = require("../models/orderModel");

// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json("No items added");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      // itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};

// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  // with "populate" take "id" and "name" from -> user document
  const orders = await Order.find({}).populate("user", "id name"); // admin endpoint only to see all orders made for this webshop
  res.json(orders);
};

// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  // ( https://mongoosejs.com/docs/populate.html#field-selection - population docs ) using populate to join data -> reference documents in other collections
  const order = await Order.findById(req.params.id).populate("user", "name email"); // add to request response also the users name and email. 

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

// @route   GET /api/orders/myOrders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }); // return orders assigned to this user
  res.json(orders);
};

// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true; // set order isPaid value to be true
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json("Order not found");
  }
};

// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true; // change delivered status to true in db 
    order.deliveredAt = Date.now(); // assign date and time of delivered

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json("Order not found");
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
