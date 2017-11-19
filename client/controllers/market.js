// const MarketService = require('../services/market.service');
const TimerService = require('../services/time.service');
// const VwapService = require('../services/vwap.service');
// const OrderService = require('../services/order.service');
const request = require('async-request');

const priceCheckLoop = () => new Promise(async (resolve, reject) => {
  try {
    const ticks = 20;
    const ticker = TimerService.getEmmiter();
    TimerService.runTimer(ticks);
    ticker.on('tick', async () => {
      console.log("Tick Tock...");
      // const marketData = MarketService.getDaily();
      let marketData = await request('http://172.20.0.4:4211'); //DATA docker
      marketData = JSON.parse(marketData.body);
      let orderData = await request('http://172.20.0.5:4212'); //DB docker
      orderData = JSON.parse(orderData.body);
      //console.log(marketData);
      console.log(orderData);
      // const executableOrderList = VwapService.simulateVwap(await marketData, await orderData);
      //MarketService.buy(executableOrderList);
    });
  } catch (err) {
    reject(err);
  }
});
module.exports = {
  priceCheckLoop,
};
