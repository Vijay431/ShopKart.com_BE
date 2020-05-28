const mongoose = require('mongoose');

const ShippingSchema = mongoose.Schema({
  user: {
    type: String,
    required: 'required'
  },
  totalprice: {
    type: Number,
    required: 'required'
  },
  products: {
    type: Array,
    required: 'required'
  }
})

module.exports = mongoose.model('shipping', ShippingSchema);
