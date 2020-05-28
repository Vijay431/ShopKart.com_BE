const express = require('express');
const Router = express.Router();

const CheckoutForm = require('../Assets/Models/checkoutform.model.js');
const Shipping = require('../Assets/Models/shipping.model.js');

Router.post('/checkoutform', (req, res, next) => {
  let user = req.body.user;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let phone = req.body.phone;
  let email = req.body.email;
  let address = req.body.address;
  let alternate = req.body.alternate;

  const newCheckoutForm = new CheckoutForm;
  newCheckoutForm.user = user;
  newCheckoutForm.firstname = firstname;
  newCheckoutForm.lastname = lastname;
  newCheckoutForm.phone = phone;
  newCheckoutForm.email = email;
  newCheckoutForm.address = address;
  newCheckoutForm.alternate = alternate;

  if(!firstname){
    const error = new Error('Invalid First Name');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!phone){
    const error = new Error('Invalid Phone Number');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!email){
    const error = new Error('Invalid Email ID');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!address){
    const error = new Error('Invalid Address');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!alternate){
    const error = new Error('Invalid Alternate');
    error.httpStatusCode = 400;
    return next(error);
  }

  newCheckoutForm.save((err, savedCheckOutForm) => {
    if(err){
      const error = new Error('Uh-Oh! Something went Wrong!');
      error.httpStatusCode = 500;
      return next(err);
    }
    else{
      if(Object.keys(savedCheckOutForm).length != 0){
        res.json({message: "success"});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
});

Router.post('/add', (req, res, next) => {
  let user = req.body.user;
  let totalprice = req.body.totalprice;
  let products = req.body.products;

  if(!user){
    const error = new Error('Invalid User');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!totalprice){
    const error = new Error('Invalid Total Price');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!products){
    const error = new Error('Invalid Products');
    error.httpStatusCode = 400;
    return next(error);
  }

  const newShipping = new Shipping;
  newShipping.user = user;
  newShipping.totalprice = totalprice;
  newShipping.products = products;

  newShipping.save((err, sailingdetails) => {
    if(err){
      const error = new Error('Uh-Oh! Something went Wrong!');
      error.httpStatusCode = 500;
      return next(error);
    }
    else{
      if(Object.keys(sailingdetails).length != 0){
        res.json({message: "success"});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
});

Router.get('/get', (req, res, next) => {
  let user = req.query.user;

  if(!user){
    const error = new Error('Invalid User');
    error.httpStatusCode = 400;
    return next(error);
  }

  Shipping.find({user: user}, (err, shippingdetails) => {
    if(err){
      const error = new Error('Uh-Oh! Something went Wrong!');
      error.httpStatusCode = 500;
      return next(error);
    }
    else{
      if(shippingdetails.length != 0){
        res.json({message: "success", data: shippingdetails});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
});

module.exports = Router;
