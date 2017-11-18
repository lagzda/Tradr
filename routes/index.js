/**
* Module Dependencies
*/
const { Router } = require('restify-router');

const router = new Router();
const AuthController = require('../controllers/auth');
/**
* Status codes
*/
const status = {
  ok: 200,
  added: 201,
  badRequest: 400,
};

/**
* Routes for the order model
*/

router.add('/users', require('./user'));
router.add('/auth', require('./auth'));
router.add('/users/:userId/orders', require('./order'));

router.use(async (req, res, next) => {
  try {
    AuthController.authenticate(req);
    res.header('WWW-Authenticate', 'Basic realm="Secure API"');
    next();
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});

/**
* Make the router available in the app
*/
module.exports = router;
