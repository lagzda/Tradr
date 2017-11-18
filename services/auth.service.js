const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const User = require('../models/user');
/**
 * Authenticates a user based on the credentials
 *
 * @function authenticate
 * @param {Object} credentials - The user credential object containing username and password
 * @returns {Promise(Function, Function)} promise that eventually authenticates the user or fails
 */
const authenticate = credentials => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findOne({ username: credentials.username });
    await user.verifyPassword(credentials.password);
  } catch (err) {
    reject(err);
  }
});
/**
 * Authorizes access to a user or resource owned by a user
 *
 * @function authenticate
 * @param {Object} authenticatedUser - The user which is currently authenticated
 * @param {String} userId - The user id in the path to access a resource
 * @returns {Promise(Function, Function)} promise that eventually authorizes the user or fails
 */
const authorize = (authenticatedUser, userId) => new Promise((resolve, reject) => {
  if (authenticatedUser.id === userId) resolve();
  else reject(new Error('Not authorized'));
});

module.exports = {
  authenticate,
  authorize,
};
