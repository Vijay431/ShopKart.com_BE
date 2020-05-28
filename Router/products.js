const express = require('express');
const Router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
})
const fileFilter = (req, file, cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    return cb(null, true);
  }
  else{
    return cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
});

const Product = require('../Assets/Models/product.model.js');

Router.post('/add', upload.single('productImage'), (req, res, next) =>{
  let productName = req.body.productName;
  let productID = req.body.productID;
  let productPrice = req.body.productPrice;
  let productDescription = req.body.productDescription;
  let productCategory = req.body.productCategory;
  let quantity = req.body.quantity;

  if(!productName){
    const error = new Error('Invalid Product Name');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productID){
    const error = new Error('Invalid Product ID');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productPrice){
    const error = new Error('Invalid Product Price');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productDescription){
    const error = new Error('Invalid Product Description');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productCategory){
    const error = new Error('Invalid Product Category');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!quantity){
    const error = new Error('Invalid Quantity');
    error.httpStatusCode = 400;
    return next(error);
  }

  const newProduct = new Product;
  newProduct.productName = productName;
  newProduct.productID = productID;
  newProduct.productPrice = productPrice;
  newProduct.productDescription = productDescription;
  newProduct.productCategory = productCategory;
  newProduct.quantity = quantity;
  newProduct.productImage.imgdata = fs.readFileSync(`uploads/${req.file.filename}`);
  newProduct.productImage.contentType = req.file.mimetype;

  newProduct.save((err, product) => {
    if(err) {
      const error = new Error('Uh-Oh! Something went Wrong!');
      return next(error);
    }
    else{
      if(Object.keys(product).length != 0){
        res.json({message: "success"});
      }
      else{
        res.json({message: "failure"});
      }
    }
  })
})

Router.get('/get', (req, res, next) => {
  let category = req.query.category;

  if(!category){
    const error = new Error('Invalid Category');
    error.httpStatusCode = 404;
    return next(error);
  }

  if(category == 'All'){
    Product.find((err, products) => {
      if(err){
        const error = new Error('Uh-Oh! Something went Wrong!');
        return next(error);
      }
      else{
        if(products.length != 0){
          res.json({message: "success", data: products});
        }
        else{
          res.json({message: "failure"});
        }
      }
    })
  }
  else{
    Product.find({productCategory: category}, (err, products) => {
      if(err){
        const error = new Error('Uh-Oh! Something went Wrong!');
        return next(error);
      }
      else{
        if(products.length != 0){
          res.json({message: "success", data: products});
        }
        else{
          res.json({message: "failure"});
        }
      }
    })
  }
})

Router.post('/update', upload.single('productImage'), (req, res, next) => {
  let productName = req.body.productName;
  let productID = req.body.productID;
  let productPrice = req.body.productPrice;
  let productDescription = req.body.productDescription;
  let productCategory = req.body.productCategory;
  let quantity = req.body.quantity;
  let objectid = req.body.objectid;

  if(!objectid){
    const error = new Error('Invalid Objectid');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productName){
    const error = new Error('Invalid Product Name');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productID){
    const error = new Error('Invalid Product ID');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productPrice){
    const error = new Error('Invalid Product Price');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productDescription){
    const error = new Error('Invalid Product Description');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!productCategory){
    const error = new Error('Invalid Product Category');
    error.httpStatusCode = 400;
    return next(error);
  }
  if(!quantity){
    const error = new Error('Invalid Quantity');
    error.httpStatusCode = 400;
    return next(error);
  }

  if(req.file){
    Product.updateOne({_id: ObjectId(objectid)}, {
      $set:{
        productName: productName,
        productID: productID,
        productPrice: productPrice,
        productDescription: productDescription,
        productCategory: productCategory,
        "productImage.imgdata": fs.readFileSync(`uploads/${req.file.filename}`),
        "productImage.contentType": req.file.mimetype
      }
    }, (err, updatedDocs) => {
        if(err){
          const error = new Error('Uh-Oh! Something went Wrong!');
          error.httpStatusCode = 500;
          return next(error);
        }
        else{
          if(updatedDocs.ok == 1){
            res.json({message: "success"});
          }
          else{
            res.json({message: "failure"});
          }
        }
      })
    }
    else{
      Product.updateOne({_id: ObjectId(objectid)}, {
        $set:{
          productName: productName,
          productID: productID,
          productPrice: productPrice,
          productDescription: productDescription,
          productCategory: productCategory
        }
      }, (err, updatedDocs) => {
          if(err){
            const error = new Error('Uh-Oh! Something went Wrong!');
            error.httpStatusCode = 500;
            return next(error);
          }
          else{
            if(updatedDocs.ok == 1){
              res.json({message: "success"});
            }
            else{
              res.json({message: "failure"});
            }
          }
        })
    }
})

module.exports = Router;
