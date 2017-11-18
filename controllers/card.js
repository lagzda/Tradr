/**
* Module Dependencies
*/
const CardService = require('../services/card.service');

module.exports = {
  list: () => new Promise(async (resolve, reject) => {
    try {
      resolve(await CardService.list());
    } catch (err) {
      reject(err);
    }
  }),
  create: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await CardService.create(req.params.userId, req.body));
    } catch (err) {
      reject(err);
    }
  }),
  read: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await CardService.read(req.params.cardId));
    } catch (err) {
      reject(err);
    }
  }),
  update: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await CardService.update(req.params.cardId, req.body));
    } catch (err) {
      reject(err);
    }
  }),
  del: req => new Promise(async (resolve, reject) => {
    try {
      resolve(await CardService.del(req.params.cardId));
    } catch (err) {
      reject(err);
    }
  }),
};
