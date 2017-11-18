/**
* Module Dependencies
*/
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
require('mongoose-type-email');


/**
* Define the Database structure for User (Schema)
*/
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

UserSchema.plugin(require('mongoose-bcrypt'));

/**
* Make the Schema available in the app
*/
module.exports = mongoose.model('User', UserSchema);
