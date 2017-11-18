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
// let UserController = require('../controllers/user');
// let User = require('../models/user');
//
// describe('User', () => {
//   let user = {
//     username: "Test",
//     password: "pass",
//     email: "test@test.test"
//   };
//   var userId;
//   //Before each test we empty the database
//   beforeEach(async () => {
//     try{
//       await User.remove({});
//       let u = await new User(user).save();
//       userId = u.id;
//     }
//     catch(e){
//       console.log(e);
//     }
//   });
//   describe('/GET users', () => {
//     it('it should GET all the users', (done) => {
//       chai.request(server)
//         .get('/users')
//         .auth('Test', 'pass')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(1);
//           done();
//         });
//     });
//   });
//   describe('/GET/:id user', () => {
//     it('it should GET a user by the given id', (done) => {
//       chai.request(server)
//       .get('/users/' + userId)
//       .auth('Test', 'pass')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('username');
//         res.body.should.have.property('_id').eql(userId);
//         done();
//       });
//     });
//   });
//   describe('/POST users', () => {
//     it('it should not POST a new user with missing required fields', (done) => {
//       let user = {};
//       chai.request(server)
//         .post('/users')
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('errors');
//           res.body.errors.should.have.property('username');
//           res.body.errors.username.should.have.property('kind').eql('required');
//           res.body.errors.should.have.property('password');
//           res.body.errors.password.should.have.property('kind').eql('required');
//           res.body.errors.should.have.property('email');
//           res.body.errors.email.should.have.property('kind').eql('required');
//           done();
//         });
//     });
//     it('it should not POST a new user with duplicate email or username', (done) => {
//       let user = {};
//       chai.request(server)
//         .post('/users')
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('errors');
//           res.body.errors.should.have.property('username');
//           res.body.errors.username.should.have.property('kind').eql('required');
//           res.body.errors.should.have.property('password');
//           res.body.errors.password.should.have.property('kind').eql('required');
//           res.body.errors.should.have.property('email');
//           res.body.errors.email.should.have.property('kind').eql('required');
//           done();
//         });
//     });
//     it('it should POST a new user and hash password', (done) => {
//       let user = {
//         username: "New",
//         password: "pass",
//         email: "new@new.new"
//       }
//       chai.request(server)
//         .post('/users')
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('User added!');
//           res.body.user.should.have.property('username').eql('New');
//           res.body.user.should.have.property('password').not.eql('pass');
//           done();
//         });
//     });
//   });
//   // describe('/PUT users', () => {
//   //   it('it should UPDATE a user by id', (done) => {
//   //     let user = new User({name: "Personal"});
//   //     user.save((err, user) => {
//   //       chai.request(server)
//   //       .put('/users/' + user.id)
//   //       .send({name: "Updated"})
//   //       .end((err, res) => {
//   //         res.should.have.status(200);
//   //         res.body.should.be.a('object');
//   //         res.body.should.have.property('message').eql('User updated!');
//   //         res.body.user.should.have.property('name').eql("Updated");
//   //         done();
//   //       });
//   //     });
//   //   });
//   // });
//   describe('/DELETE users', () => {
//     it('it should not DELETE other user', (done) => {
//       let user = {
//         username: "New",
//         password: "pass",
//         email: "new@new.new"
//       }
//       new User(user).save().then((err, user)=> {
//         chai.request(server)
//         .delete('/users/' + userId)
//         .auth('New', 'pass')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.body.should.be.a('object');
//           done();
//         });
//       })
//     });
//     it('it should DELETE a user by id', (done) => {
//       chai.request(server)
//       .delete('/users/' + userId)
//       .auth('Test', 'pass')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').eql('User deleted!');
//         res.body.result.should.have.property('ok').eql(1);
//         res.body.result.should.have.property('n').eql(1);
//         done();
//       });
//     });
//   });
// });
