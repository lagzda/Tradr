const Order = require('../models/order');
/**
 * List all orders
 *
 * @function list
 * @returns {Promise(Function, Function)} eventually returns an array of orders or throws error
 */
const list = () => new Promise(async (resolve, reject) => {
  try {
    resolve(await Order.find({}));
  } catch (err) {
    reject(err);
  }
});
/**
 * Create a order
 *
 * @function create
 * @param {String} userId the owner of the order
 * @param {Object} order the order object to create
 * @returns {Promise(Function, Function)} eventually creates and returns a order or throws error
 */
const create = (userId, order) => new Promise(async (resolve, reject) => {
  try {
    const creatableOrder = await Object.assign(order, { createdBy: userId });
    resolve(new Order(creatableOrder).save());
  } catch (err) {
    reject(err);
  }
});
/**
 * Retrieves a single order by ID
 *
 * @function read
 * @param {String} orderId the ID of the order
 * @returns {Promise(Function, Function)} eventually returns a order or throws error
 */
const read = orderId => new Promise(async (resolve, reject) => {
  try {
    resolve(await Order.findById(orderId));
  } catch (err) {
    reject(err);
  }
});
/**
 * Updates a single order
 *
 * @function update
 * @param {String} orderId the ID of the order
 * @param {Object} body key/value pairs of the fields that should be changed
 * @returns {Promise(Function, Function)} eventually updates and returns a order or throws error
 */
const update = (orderId, body) => new Promise(async (resolve, reject) => {
  try {
    const updatedOrder = await Object.assign(await Order.findById(orderId), body);
    resolve(updatedOrder.save());
  } catch (err) {
    reject(err);
  }
});
/**
 * Deletes a single order
 *
 * @function del
 * @param {String} orderId the ID of the order
 * @returns {Promise(Function, Function)} eventually deletes and returns order or throws error
 */
const del = orderId => new Promise(async (resolve, reject) => {
  try {
    resolve(await Order.removeById(orderId));
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  list,
  create,
  read,
  update,
  del,
};
