/**
* Import User Model and Mock Data, Market Service
*/
const User = require('../../models/user');
const MarketService = require('../../services/market.service');
const UserMock = require('../mockData/user.mock');
const MarketMock = require('../mockData/auth.mock');
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
  let authenticatedUser1;
  let authenticatedUser2;

  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  beforeEach(async () => {
    await User.remove({});
    authenticatedUser1 = await User.create(UserMock.user1);
    authenticatedUser2 = await User.create(UserMock.user2);
  });

  afterEach(async () => User.remove({}));

  describe('#get()', () => {
    it('resolve', async () => {
      try{
        console.log(MarketService);
        const authentication = await MarketService.get("1min", "10", "MSFT", "SMA");
        //expect(authentication).to.eventually.be.a('object');
        //expect(authentication).to.eventually.have.property('Meta Data');
      } catch(err){
        console.log(err);
        expect.fail();
      }
    });
  });

  describe('#getDaily()', () => {
    it('resolve', async () => {
      try{
        console.log(MarketService);
        const authentication = await MarketService.getDaily("AAPL");
        //expect(authentication).to.eventually.be.a('object');
        //expect(authentication).to.eventually.have.property('Meta Data');
      } catch(err){
        console.log(err);
        expect.fail();
      }
    });
  });
});
