const Joi = require("joi");
// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}
}, {
  timestamps: true
})

// const Review = model("Review", reviewSchema);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      // default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

/* TODO: validate model */

// function validateProduct(product) {
//   const schema = Joi.object({
//     firstName: Joi.string().max(100).required(),
//     lastName: Joi.string().max(100).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).max(100).required(),
//   });

//   return schema.validate(product);
// }

// module.exports.validate = validateProduct;
module.exports.Product = Product;