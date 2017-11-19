const request = require('async-request');
const restify = require('restify');
const config = require('./config');

const server = restify.createServer({
  name: config.name,
  version: config.version,
});


server.listen(config.port, () => {
  console.log("Running");
});


server.get("/", async (req, res) => {
  res.json(200, await get());
});


let response;

const get = () => new Promise(async (resolve, reject) => {
  try {
    response = await request('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&outputsize=full&interval=60min&apikey=KPNMCSVXT1GYP5N0');
    let arr = [];
    let crrDate;
    let arrIdx = 0;
    response = JSON.parse(response.body);
    for (var key in response['Time Series (60min)']) {
      let date = new Date(key);
      if(!crrDate){
        crrDate = date.getDate();
        arr.push([]);
      }
      if(crrDate != date.getDate()){
        arrIdx++;
        crrDate = date.getDate()
        arr.push([]);
      }
      arr[arrIdx].push(response['Time Series (60min)'][key]);
    }
    console.log(arr);
    resolve(arr);
  } catch (err) {
    reject(err);
  }
});

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=full&apikey=KPNMCSVXT1GYP5N0

const getDaily = symbol => new Promise(async (resolve, reject) => {
  try {
    response = await request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=KPNMCSVXT1GYP5N0`);
    response = JSON.parse(response.body);
    resolve(response);
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  get,
  getDaily,
};
