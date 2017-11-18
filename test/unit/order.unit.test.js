/**
* Import Order Model, Service and Mock data
*/
const Order = require('../../models/order');
const User = require('../../models/user');
const OrderMock = require('../mockData/order.mock');
const UserMock = require('../mockData/user.mock');
const OrderService = require('../../services/order.service');
/**
* Dependencies and config
*/
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const config = require('../../config');

chai.use(chaiAsPromised);

describe('Orders', () => {
  let authenticatedUser1;

  before(async () => mongoose.connect(`${config.db.uri}_test`, { useMongoClient: true }));
  after(() => mongoose.connection.close());

  beforeEach(async () => {
    await User.remove({});
    await Order.remove({});
    authenticatedUser1 = await User.create(UserMock.user1);
    const order = await Object.assign(OrderMock.order1, { createdBy: authenticatedUser1.id });
    await Order.create(order);
  });

  afterEach(async () => Order.remove({}));

  describe('#list()', () => {
    it('should list all orders', async () => {
      const orders = await OrderService.list();
      expect(orders).to.be.a('array');
      expect(orders).to.have.length(1);
    });
  });
  describe('#create()', () => {
    it('should not create a order with missing required fields', async () => {
      try {
        await OrderService.create(authenticatedUser1.id, OrderMock.order2);
      } catch (err) {
        expect(err).to.have.property('name').eql('ValidationError');
      }
    });
    it('should create a valid order', async () => {
      const order = await OrderService.create(authenticatedUser1.id, OrderMock.order1);
      expect(order).to.have.property('id');
    });
  });
});
