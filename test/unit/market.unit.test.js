/**
* Import User Model and Mock Data, Market Service
*/
const User = require('../../models/user');
const MarketService = require('../../services/market.service');
/**
* Dependencies and config
*/

const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(chaiAsPromised);

describe('Market', () => {
  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  beforeEach(async () => {
    await User.remove({});
  });

  afterEach(async () => User.remove({}));

  describe('#get()', () => {
    it('resolve', async () => {
      try {
        const result = await MarketService.get('1min', '10', 'MSFT', 'SMA');
        expect(result).to.be.a('object');
        expect(result).to.have.property('Meta Data');
      } catch (err) {
        expect.fail();
      }
    });
  });

  describe('#getDaily()', () => {
    it('resolve', async () => {
      try {
        const result = await MarketService.getDaily('AAPL');
        expect(result).to.be.a('object');
      } catch (err) {
        expect.fail();
      }
    });
  });
});
