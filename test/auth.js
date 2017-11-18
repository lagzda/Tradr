// /**
// * Set to test environment
// */
// process.env.NODE_ENV = 'test';
// /**
// * Module Dependencies
// */
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const chaiAsPromised = require('chai-as-promised');
// const mongoose = require("mongoose");
//
// //Shortcuts for test chaining
// const expect = chai.expect;
// const should = chai.should();
//
// //Chai settings
// chai.use(chaiAsPromised);
// chai.use(chaiHttp);
// chai.config.includeStack = true;
//
// let server = require('../index');
// let AuthController = require('../controllers/auth');
// let User = require('../models/user');
//
// describe('Auth route', () => {
//   let user = {
//     username: "Test",
//     password: "pass",
//     email: "test@test.test"
//   };
//   //Before each test we empty the database and register user
//   beforeEach( async () => {
//     try{
//       await User.remove({});
//       await new User(user).save();
//     }
//     catch(e){
//       console.log(e);
//     }
//   });
//   describe('/GET auth', () => {
//     it('it should authenticate correct credentials', (done) => {
//       chai.request(server)
//         .get('/auth')
//         .auth('Test', 'pass')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//     it('it should not authenticate incorrect credentials', (done) => {
//       chai.request(server)
//         .get('/auth')
//         .auth('Test', 'pass123')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
// });
