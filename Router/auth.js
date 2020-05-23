const express = require('express');
const Router = express.Router();

const Auth = require('../Assets/Models/auth.model.js');

Router.route('/login').get((req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  Auth.find({username: username, password: password},
    (err, users) => {
      if(err) return console.error(err);
      else{
        if(users.length != 0){
          res.json({message: "success", data: users});
        }
        else{
          res.json({message: "failure", data: users});
        }
      }
    })
});

Router.route('/register').post((req, res) => {
   const newUser = new Auth;
   newUser.username = req.body.username;
   newUser.password = req.body.password;

  newUser.save((err, users) => {
    if(err) return console.error(err);
    else{
      if(Object.keys(users).length != 0){
        res.json({message: "success"});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
})

module.exports = Router;
