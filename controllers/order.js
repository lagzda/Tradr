/**
* Module Dependencies
*/
const OrderService = require('../services/order.service');

module.exports = {
  list: () => new Promise(async (resolve, reject) => {
    try {
      resolve(await OrderService.list());
    } catch (err) {
      reject(err);
    }
  }),
  create: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await OrderService.create(req.params.userId, req.body));
    } catch (err) {
      reject(err);
    }
  }),
  read: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await OrderService.read(req.params.orderId));
    } catch (err) {
      reject(err);
    }
  }),
  update: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await OrderService.update(req.params.orderId, req.body));
    } catch (err) {
      reject(err);
    }
  }),
  del: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await OrderService.del(req.params.orderId));
    } catch (err) {
      reject(err);
    }
  }),
};
