const mongoose = require('mongoose');

const CheckoutFormSchema = mongoose.Schema({
  user: {
    type: String,
    required: 'required'
  },
  firstname: {
    type: String,
    required: 'required'
  },
  lastname: {
    type: String
  },
  phone: {
    type: String,
    required: 'required'
  },
  email: {
    type: String,
    required: 'required'
  },
  address: {
    type: String,
    required: 'required'
  },
  alternate: {
    type: String,
    required: 'required'
  }
})

module.exports = mongoose.model('checkoutform', CheckoutFormSchema);
