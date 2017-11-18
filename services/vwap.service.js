const simulateVwap = () => new Promise(async (resolve, reject) => {
  try {
    resolve(true);
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  simulateVwap,
};
