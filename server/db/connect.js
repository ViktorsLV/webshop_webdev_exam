const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config();

// Connect to DB
const connect = mongoose.connect(process.env.MONGO_URI, () => console.log(`connected to DB`.magenta.bold))

module.exports = connect
