/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const routerInstance = require('./routes');

/**
 * Service and Controller Dependencies
 */
const TimerService = require('./services/time.service');
/**
* Initialize Server
*/
const server = restify.createServer({
  name: config.name,
  version: config.version,
});

/**
* Middleware
*/
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.authorizationParser());
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
* Start Server, Connect to DB & Require Routes
*/
server.listen(config.port, () => {
  // Establish connection to mongodb
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, { useMongoClient: true });

  const db = mongoose.connection;
  /* eslint-disable no-console */
  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', async () => {
    routerInstance.applyRoutes(server);
    const hourEmmiter = await TimerService.getEmmiter();
    TimerService.runTimer(3);
    hourEmmiter.on('tick', () => {
      console.log('tick');
    });
    console.log(`Server is listening on port ${config.port}`);
  });
  /* eslint-enable no-console */
});
module.exports = server; // for testing
