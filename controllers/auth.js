const AuthService = require('../services/auth.service');

module.exports = {
  authenticate: req => new Promise(async (resolve, reject) => {
    try {
      if (req.path() === '/users' && req.method === 'POST') resolve();
      else {
        const authenticationHeader = await AuthService.extractAuthentication(req);
        const authenticatedUser = await AuthService.authenticate(authenticationHeader);
        req.authenticatedUser = authenticatedUser;
        resolve();
      }
    } catch (err) {
      reject(err);
    }
  }),
  authorize: async (req, callback) => {
    try {
      await AuthService.authorize(req.authenticated_user, req.params.userId);
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
};
