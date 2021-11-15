const mongoose = require('mongoose');
const dotenv = require('dotenv')
const colors = require('colors');
const users = require('./users')
const products = require('./products')
const {User} = require('../models/userModel')
const {Product} = require('../models/productModel')
const {Order} = require('../models/orderModel')
const connect = require('../db/connect')

dotenv.config()

const importData = async () => {
  try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()
      
      
      const createdUsers = await User.insertMany(users)
      const adminUser = createdUsers[0]._id

      const sampleProducts = products.map(product => {
        return {...product, user: adminUser}
      })

      await Product.insertMany(sampleProducts)
      console.log('data imported'.green.inverse)
  } catch (error) {
      console.error(`${error}`.red.underline)
  }
}

const destroyData = async () => {
  try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()

      console.log('data DESTROYED'.bgRed.inverse)
  } catch (error) {
      console.error(`${error}.red.inverse`)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}