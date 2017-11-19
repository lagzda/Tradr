const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const hourEmmiter = new MyEmitter();

const getEmmiter = () => hourEmmiter;

const runTimer = ticks => new Promise(async (resolve, reject) => {
  try {
    let timer = 0;
    const interval = setInterval(() => {
      hourEmmiter.emit('tick');
      timer += 1;
      if (timer === ticks) clearInterval(interval);
    }, 1000);
    resolve();
  } catch (err) {
    reject(err);
  }
});
module.exports = {
  runTimer,
  getEmmiter,
};
