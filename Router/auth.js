const express = require('express');
const Router = express.Router();

const Auth = require('../Assets/Models/auth.model.js');

Router.get('/login', (req, res, next) => {
  let username = req.query.username;
  let password = req.query.password;

  if(!username){
    const error = new Error('Invalid username');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!password){
    const error = new Error('Invalid password');
    error.httpStatusCode = 400;
    return next(error);
  }

  Auth.find({username: username, password: password},
    (err, users) => {
      if(err){
        const error = new Error('Uh-Oh! Something went Wrong!');
        return next(error);
      }
      else{
        if(users.length != 0){
          res.json({message: "success", data: users});
        }
        else{
          res.json({message: "failure"});
        }
      }
    })
});

Router.post('/register',(req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;

  if(!username){
    const error = new Error('Invalid username');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!password){
    const error = new Error('Invalid password');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!type){
    const error = new Error('Invalid user type');
    error.httpStatusCode = 400;
    return next(error);
  }

  const newUser = new Auth;
  newUser.username = username;
  newUser.password = password;
  newUser.type = type;

   newUser.save((err, users) => {
     if(err){
       const error = new Error('Uh-Oh! Something went Wrong!');
       return next(error);
     }
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
