/**
* Module Dependencies
*/
const { Router } = require('restify-router');

const router = new Router();
/**
* Controllers
*/
const OrderController = require('../controllers/order');
/**
* Status codes
*/
const status = {
  ok: 200,
  added: 201,
  badRequest: 400,
};

router.post('/', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'POST');
    res.send(status.added, await OrderController.create(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.get('/:orderId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET');
    res.send(status.ok, await OrderController.read(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.patch('/:orderId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'PATCH');
    res.send(status.ok, await OrderController.update(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.del('/:orderId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'DELETE');
    res.send(status.ok, await OrderController.del(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});

module.exports = router;
