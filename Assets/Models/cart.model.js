const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  user: {
    type: String,
    required: 'required'
  },
  items: {
    type: String,
    required: 'required'
  }
})

module.exports = mongoose.model('cart', CartSchema);
