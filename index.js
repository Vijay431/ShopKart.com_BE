//Default dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Assets/DB/dbConnection.js');

//Requiring custom routes
const Auth = require('./Router/auth.js');
const Cart = require('./Router/cart.js');
const Products = require('./Router/products.js');
const Shipping = require('./Router/shipping.js');

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//custom middlewares
app.use('/auth', Auth);
app.use('/products', Products);
app.use('/cart', Cart);
app.use('/shipping', Shipping);

//404 Not Found
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.httpStatusCode = 404;
  next(error);
})

//Error handler
app.use((error, req, res, next) => {
  res.status(error.httpStatusCode).send({
    error: {
      status: error.httpStatusCode || 500,
      message: error.message
    }
  });
})

//app listening to the PORT
app.listen(process.env.PORT);
