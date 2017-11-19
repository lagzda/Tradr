const request = require('async-request');
const restify = require('restify');
const config = require('./config');
const restifyPlugins = require('restify-plugins');
const morgan = require('morgan');
const server = restify.createServer({
  name: config.name,
  version: config.version,
});
let database = [];

server.listen(config.port, () => {
  console.log('running');
});

server.use(morgan('dev')); //Initialise morgan logger on 'dev' preset
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));

server.post("/", async (req, res) => {
  res.json(200, await post(req.body.symbol, req.body.amount));
});

server.get("/", async (req, res) => {
  response = await get(req.params.id);
  res.json(200, response);
});

server.get("/:id", async (req, res) => {
  response = await getOne(req.params.id);
  res.json(200, response);
});


let response;

const getOne = (id) => new Promise(async (resolve, reject) => {
  try {
    console.log(id);
    console.log(database);
    for(let i = 0; i < database.length; i++){
      if(database[i].id == id){
        console.log(database[i])
        console.log(id);
        resolve(database[i]);
      }
      reject();
    }
    resolve(arr);
  } catch (err) {
    reject(err);
  }
});

const get = () => new Promise(async (resolve, reject) => {
  try {
    resolve(database);
  } catch (err) {
    reject(err);
  }
});

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=full&apikey=KPNMCSVXT1GYP5N0

const post = (symbol, amount) => new Promise(async (resolve, reject) => {
  try {
    let order = { "amount":amount, "symbol":symbol, "id":database.length };
    database.push(order);
    resolve(order);
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  get,
  post,
};
