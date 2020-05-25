const express = require('express');
const Router = express.Router();
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
  let productDescription = req.body.productDescription;
  let productCategory = req.body.productCategory;

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
  console.log(req.file);

  const newProduct = new Product;
  newProduct.productName = productName;
  newProduct.productID = productID;
  newProduct.productDescription = productDescription;
  newProduct.productCategory = productCategory;
  newProduct.productImage.imgdata = fs.readFileSync(`uploads/${req.file.filename}`);
  newProduct.productImage.contentType = req.file.mimetype;
  console.log(newProduct);

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

})

module.exports = Router;
