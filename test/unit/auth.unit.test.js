/**
* Import User Model and Mock Data, Auth Service
*/
const User = require('../../models/user');
const AuthService = require('../../services/auth.service');
const UserMock = require('../mockData/user.mock');
const AuthMock = require('../mockData/auth.mock');
/**
* Dependencies and config
*/
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(chaiAsPromised);

describe('Auth', () => {
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

  describe('#authenticate()', () => {
    it('should authenticate a valid user', () => {
      const authentication = AuthService.authenticate(AuthMock.auth1);
      expect(authentication).to.eventually.be.a('object');
      expect(authentication).to.eventually.have.property('id');
    });
    it('should not authenticate an invalid user', () => {
      const authentication = AuthService.authenticate(AuthMock.auth2);
      expect(authentication).to.eventually.be.rejectedWith(Error);
    });
    it('should not authenticate an empty object', () => {
      const authentication = AuthService.authenticate(AuthMock.auth2);
      expect(authentication).to.eventually.be.rejectedWith(Error);
    });
  });
  describe('#authorize()', () => {
    it('should authorize the resource owner', () => {
      AuthService.authorize(authenticatedUser1, authenticatedUser1.id);
    });
    it('should not authorize resource to non-owners', () => {
      const authorization = AuthService.authorize(authenticatedUser1, authenticatedUser2.id);
      expect(authorization).to.eventually.be.rejectedWith(Error);
    });
  });
});
