/**
* Module Dependencies
*/
const { Router } = require('restify-router');

const router = new Router();
/**
* Controllers
*/
const AuthController = require('../controllers/auth');

router.get('/', AuthController.authenticate, AuthController.login);

module.exports = router;
