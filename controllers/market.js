const MarketService = require('../services/market.service');
const TimerService = require('../services/time.service');
const VwapService = require('../services/vwap.service');
const OrderService = require('../services/order.service');

const priceCheckLoop = () => new Promise(async (resolve, reject) => {
  try {
    const ticks = 20;
    const ticker = TimerService.getEmmiter();
    TimerService.runTimer(ticks);
    ticker.on('tick', async () => {
      const marketData = MarketService.getDaily();
      const orderData = OrderService.list();
      const executableOrderList = VwapService.simulateVwap(await marketData, await orderData);
      MarketService.buy(executableOrderList);
    });
  } catch (err) {
    reject(err);
  }
});
module.exports = {
  priceCheckLoop,
};
