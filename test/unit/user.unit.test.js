/**
* Import User Model, Service and Mock data
*/
const User = require('../../models/user');
const UserService = require('../../services/user.service');
const UserMock = require('../mockData/user.mock');
/**
* Dependencies and config
*/
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(chaiAsPromised);

describe('Users', () => {
  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  beforeEach(async () => {
    await User.remove({});
    await User.create(UserMock.user1);
  });

  afterEach(async () => User.remove({}));

  describe('#list()', () => {
    it('should list all users', async () => {
      const users = await UserService.list();
      expect(users).to.be.a('array');
      expect(users).to.have.length(1);
    });
  });
  describe('#create()', () => {
    it('should not create a user with duplicate username or email', async () => {
      try {
        await UserService.create(UserMock.user1);
        expect.fail();
      } catch (err) {
        expect(err).to.have.property('name').eql('MongoError');
      }
    });
    it('should not create a user with missing required fields', async () => {
      try {
        await UserService.create(UserMock.user3);
        expect.fail();
      } catch (err) {
        expect(err).to.have.property('name').eql('ValidationError');
      }
    });
    it('should create a valid user', async () => {
      const user = await UserService.create(UserMock.user2);
      expect(user).to.have.property('id');
    });
  });
});
