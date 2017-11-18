/**
* Module Dependencies
*/
const { Router } = require('restify-router');

const router = new Router();
/**
* Controllers
*/
const CardController = require('../controllers/card');
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
    res.send(status.added, await CardController.create(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.get('/:cardId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET');
    res.send(status.ok, await CardController.read(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.patch('/:cardId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'PATCH');
    res.send(status.ok, await CardController.update(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.del('/:cardId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'DELETE');
    res.send(status.ok, await CardController.del(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});

module.exports = router;
