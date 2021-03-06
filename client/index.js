const request = require('async-request');
const restify = require('restify');
const config = require('./config');
const MarketController = require('./controllers/market');
const restifyPlugins = require('restify-plugins');


const server = restify.createServer({
  name: config.name,
  version: config.version,
});


server.listen(config.port, () => {
  console.log("Running");
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));

server.post("/orders", async (req, res) => {
  console.log(req.body);
  res.json(200, await post(req.body.symbol, req.body.amount));
});
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));

MarketController.priceCheckLoop();

let response;

const post = (symbol, amount) => new Promise(async (resolve, reject) => {
  try {
    // console.log(symbol);
    // console.log(amount);
    response = await request('http://172.20.0.5:4212/orders/'+symbol+'/'+amount, {
      method: "POST",
      data: {
        symbol:symbol,
        amount:amount
      },
      headers:{
        'Content-Type':'application/json'
      }
    });
    resolve(response);
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  post,
};
