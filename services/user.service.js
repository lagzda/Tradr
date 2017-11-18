const User = require('../models/user');
/**
 * List all users
 *
 * @function list
 * @returns {Promise(Function, Function)} eventually returns an array of users or throws error
 */
const list = () => new Promise(async (resolve, reject) => {
  try {
    resolve(await User.find({}));
  } catch (err) {
    reject(err);
  }
});
/**
 * Create a user
 *
 * @function create
 * @param {String} userId the owner of the user
 * @param {Object} user the user object to create
 * @returns {Promise(Function, Function)} eventually creates and returns a user or throws error
 */
const create = user => new Promise(async (resolve, reject) => {
  try {
    resolve(await new User(user).save());
  } catch (err) {
    reject(err);
  }
});
/**
 * Retrieves a single user by ID
 *
 * @function read
 * @param {String} userId the ID of the user
 * @returns {Promise(Function, Function)} eventually returns a user or throws error
 */
const read = userId => new Promise(async (resolve, reject) => {
  try {
    resolve(await User.findById(userId));
  } catch (err) {
    reject(err);
  }
});
/**
 * Updates a single user
 *
 * @function update
 * @param {String} userId the ID of the user
 * @param {Object} body key/value pairs of the fields that should be changed
 * @returns {Promise(Function, Function)} eventually updates and returns a user or throws error
 */
const update = (userId, body) => new Promise(async (resolve, reject) => {
  try {
    resolve(await Object.assign(await User.findById(userId), body).save());
  } catch (err) {
    reject(err);
  }
});
/**
 * Deletes a single user
 *
 * @function del
 * @param {String} userId the ID of the user
 * @returns {Promise(Function, Function)} eventually deletes and returns user or throws error
 */
const del = userId => new Promise(async (resolve, reject) => {
  try {
    resolve(await User.removeById(userId));
  } catch (err) {
    reject(err);
  }
});
/**
 * Removes sensitive information from the user object
 *
 * @function del
 * @param {Object} user the user object to be stripped
 * @returns {Object} user the stripped user object
 */
const stripSensitiveInformation = (user) => {
  const publicUser = user;
  delete publicUser.password;
  return publicUser;
};

module.exports = {
  list,
  create,
  read,
  update,
  del,
  stripSensitiveInformation,
};
