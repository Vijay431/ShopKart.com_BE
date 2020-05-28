const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: 'required'
  },
  productID: {
    type: String,
    required: 'required'
  },
  productDescription: {
    type: String,
    required: 'required'
  },
  productCategory: {
    type: String,
    required: 'required'
  },
  productPrice: {
    type: String,
    required: 'required'
  },
  productImage: {
    imgdata: Buffer,
    contentType: String
  },
  quantity: {
    type: Number,
    required: 'required'
  }
})

module.exports = mongoose.model('product', ProductSchema)
