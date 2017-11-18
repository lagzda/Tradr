/**
* Module Dependencies
*/
const { Router } = require('restify-router');

const router = new Router();
/**
* Controllers
*/
const UserController = require('../controllers/user');
/**
* Status codes
*/
const status = {
  ok: 200,
  added: 201,
  badRequest: 400,
};

/**
 * @api {get} /users list all users
 * @apiDescription List all the users in the system
 * @apiGroup Users
 * @apisamplerequest off
 * @apiPermission none
 * @apiHeader Content-Type application/json
 * @apiHeader If-None-Match (optional) the eTag hash from the last request
 * @apiSuccess {Object} response top-level object
 * @apiSuccess {Array} response.users an array of users
 * @apiSuccess {String} response.users.username the username of the user
 * @apiSuccess {String} response.users.first_name the first name of the user
 * @apiSuccess {String} response.users.last_name the last name of the user
 * @apiExample {curl} Example usage:
 *   curl -i http://api.example.com/users
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "users": [
 *       {
 *         "username": "john_doe",
 *         "first_name": "John",
 *         "last_name": "Doe"
 *       },
 *       {
 *         "username": "jane_doe",
 *         "first_name": "Jane",
 *         "last_name": "Doe"
 *       }
 *     ]
 *   }
 */
router.get('/', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET');
    res.send(status.ok, await UserController.list());
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'POST');
    res.send(status.added, await UserController.create(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET');
    res.send(status.ok, await UserController.read(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.patch('/:userId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'PATCH');
    res.send(status.ok, await UserController.update(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});
router.del('/:userId', async (req, res) => {
  try {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'DELETE');
    res.send(status.ok, await UserController.del(req));
  } catch (err) {
    res.send(status[err.message], { error: err.message });
  }
});

module.exports = router;
