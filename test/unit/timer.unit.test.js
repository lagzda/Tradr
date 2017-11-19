const TimerService = require('../../services/time.service');
/**
* Dependencies and config
*/
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;

const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(require('chai-events'));

chai.use(chaiAsPromised);

describe('Timer', () => {
  const hourEmmiter = TimerService.getEmmiter();
  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  describe('#runTimer()', () => {
    it('should tick', async () => {
      const ticks = 1;
      TimerService.runTimer(ticks);
      expect(hourEmmiter).to.emit('tick');
    });
  });
});
