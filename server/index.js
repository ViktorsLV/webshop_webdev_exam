const express = require("express");
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv'); // env files
const connect = require('./db/connect'); // connecting to DB
const {notFound, errorHandler } = require('./middlewares/errorMiddleware')
dotenv.config()
const app = express(); // init app

// importing routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// log only 2xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 200 }
}))

app.use(express.json()); // for parsing json
app.use(cors())
// app.use(errorHandler);
// app.use(notFound)

app.get("/", (req, res) => {
  res.send("API is running");
});

// Using the routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.underline));
