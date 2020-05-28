const express = require('express');
const Router = express.Router();

const Cart = require('../Assets/Models/cart.model.js');

Router.post('/add', (req, res, next) => {
  let user = req.body.user;
  let items = req.body.items;

  if(!user){
    const error = new Error('Invalid User');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!items){
    const error = new Error('Invalid Items');
    error.httpStatusCode = 400;
    return next(error);
  }

  Cart.find({user: user}, (err, userByToken) => {
    if(err){
      const error = new Error('Uh-Oh! Something went Wrong!');
      error.httpStatusCode = 500;
      return next(error);
    }
    else{
      if(userByToken.length != 0){
        Cart.updateOne({user: user}, {
          $set: {
            items: JSON.stringify(items)
          },
        }, (err, updates) => {
          if(err){
            const error = new Error('Uh-Oh! Something went Wrong!');
            error.httpStatusCode = 500;
            return next(error);
          }
          else{
            if(updates.ok == 1){
              res.json({message: "success"});
            }
            else{
              res.json({message: "failure"});
            }
          }
        })
      }
      else{
        const newCartItems = new Cart;
        newCartItems.user = user;
        newCartItems.items = JSON.stringify(items);
        newCartItems.save((err, cartItem) => {
          if(err){
            const error = new Error('Uh-Oh! Something went Wrong!');
            error.httpStatusCode = 500;
            return next(error);
          }
          else{
            if(Object.keys(cartItem).length != 0){
              res.json({message: "success"});
            }
            else{
              res.json({message: "failure"});
            }
          }
        })
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

  Cart.find({user: user}, (err, cartProducts) => {
    if(err){
      const error = new Error('Uh-Oh! Something went Wrong!');
      error.httpStatusCode = 500;
      return next(error);
    }
    else{
      if(cartProducts.length != 0){
        res.json({message: "success", data: cartProducts});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
});

module.exports = Router;
