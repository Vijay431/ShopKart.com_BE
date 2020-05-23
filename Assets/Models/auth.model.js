const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'required'
  },
  password: {
    type: String,
    required: 'required'
  }
})

module.exports = mongoose.model('auth', AuthSchema);
