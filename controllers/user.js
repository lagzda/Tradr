/**
* Module Dependencies
*/
const UserService = require('../services/user.service');

module.exports = {
  list: () => new Promise(async (resolve, reject) => {
    try {
      resolve(await UserService.list());
    } catch (err) {
      reject(err);
    }
  }),
  create: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await UserService.create(req.body));
    } catch (err) {
      reject(err);
    }
  }),
  read: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await UserService.read(req.params.userId));
    } catch (err) {
      reject(err);
    }
  }),
  update: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await UserService.update(req.params.userId, req.body));
    } catch (err) {
      reject(err);
    }
  }),
  del: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await UserService.del(req.params.userId));
    } catch (err) {
      reject(err);
    }
  }),
};
