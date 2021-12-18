const Joi = require("joi");
// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


let orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [{
      name: {type: String, required: true},
      qty: {type: Number, required: true},
      // image: {type: String, required: true},
      price: {type: Number, required: true},
      product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}, // reference product model
    }],
    shippingAddress: {
      address: {type: String, required: true},
      city: {type: String, required: true},
      postalCode: {type: String, required: true},
      country: {type: String, required: true},
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    /* TODO: add payment id ?  */
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

/* TODO: validate model */

// function validateOrder(order) {
//   const schema = Joi.object({
//     firstName: Joi.string().max(100).required(),
//     lastName: Joi.string().max(100).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).max(100).required(),
//   });

//   return schema.validate(order);
// }

// module.exports.validate = validateOrder;
module.exports.Order = Order;