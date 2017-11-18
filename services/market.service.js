
let request = require('async-request'),
    response;

const get = (interval, period, symbol, fnc) => new Promise(async (resolve, reject) => {
  try {
    response = await request('https://www.alphavantage.co/query?function='+fnc+'&symbol='+symbol+'&interval='+interval+'&time_period='+period+'&series_type=close&apikey=KPNMCSVXT1GYP5N0');
    response = JSON.parse(response.body);
    console.log("asddsa");
    console.log(typeof response);
    resolve(response);
  } catch (err) {
    reject(err);
  }
});

//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=full&apikey=KPNMCSVXT1GYP5N0

const getDaily = (symbol) => new Promise(async (resolve, reject) => {
  try {
    response = await request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+symbol+'&outputsize=full&apikey=KPNMCSVXT1GYP5N0');
    response = JSON.parse(response.body);
    console.log("asddsa");
    console.log(typeof response);
    resolve(response);
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  get,
  getDaily,
};
