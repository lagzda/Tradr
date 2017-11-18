const request = require('request');

const asd = (interval, period, symbol, fnc) => new Promise(async (resolve, reject) => {
  try {
    const [body, response] = await request('https://www.alphavantage.co/query?function=SMA&symbol=MSFT&interval=1min&time_period=10&series_type=close&apikey=KPNMCSVXT1GYP5N0')
    console.log("asddsa");
    console.log([body, response]);
    resolve(body);
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  asd,
};
