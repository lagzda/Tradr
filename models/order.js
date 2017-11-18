/**
* Module Dependencies
*/
const mongoose = require('mongoose');

/**
* Define the Database structure for Order (Schema)
*/
const OrderSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
  strategy: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

/**
* Make the Schema available in the app
*/
module.exports = mongoose.model('Order', OrderSchema);
