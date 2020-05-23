const mongoose = require('mongoose');
require('dotenv').config();

const MongoDB = mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
  if(err) return console.error(err);
  console.log("Connected to DB");
})

module.exports = MongoDB;
