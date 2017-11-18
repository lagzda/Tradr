/**
* Import Card Model, Service and Mock data
*/
const Card = require('../../models/card');
const User = require('../../models/user');
const CardMock = require('../mockData/card.mock');
const UserMock = require('../mockData/user.mock');
const CardService = require('../../services/card.service');
/**
* Dependencies and config
*/
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(chaiAsPromised);

describe('Cards', () => {
  let authenticatedUser1;

  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  beforeEach(async () => {
    await User.remove({});
    await Card.remove({});
    authenticatedUser1 = await User.create(UserMock.user1);
    const card = await Object.assign(CardMock.card1, { createdBy: authenticatedUser1.id });
    await Card.create(card);
  });

  afterEach(async () => Card.remove({}));

  describe('#list()', () => {
    it('should list all cards', async () => {
      const cards = await CardService.list();
      expect(cards).to.be.a('array');
      expect(cards).to.have.length(1);
    });
  });
  describe('#create()', () => {
    it('should not create a card with missing required fields', async () => {
      try {
        await CardService.create(authenticatedUser1.id, CardMock.card2);
      } catch (err) {
        expect(err).to.have.property('name').eql('ValidationError');
      }
    });
    it('should create a valid card', async () => {
      const card = await CardService.create(authenticatedUser1.id, CardMock.card1);
      expect(card).to.have.property('id');
    });
  });
});
