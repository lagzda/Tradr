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
// let CardController = require('../controllers/card');
// let User = require('../models/user');
// let Card = require('../models/card');
//
// describe('Card', () => {
//   let user = {
//     username: "Test",
//     password: "pass",
//     email: "test@test.test"
//   };
//   var userId;
//   //Before each test we empty the database
//   beforeEach(async () => {
//     try{
//       await Card.remove({});
//       await User.remove({});
//       let u = await new User(user).save();
//       userId = u.id;
//     }
//     catch(e){
//       console.log(e);
//     }
//   });
//   describe('/GET cards', () => {
//     it('it should GET all the cards', (done) => {
//       chai.request(server)
//         .get('/users/'+userId+'/cards')
//         .auth('Test', 'pass')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(0);
//           done();
//         });
//     });
//   });
//   describe('/GET/:id card', () => {
//     it('it should GET a card by the given id', (done) => {
//       let card = new Card({name: "Personal"});
//       card.save((err, card) => {
//         chai.request(server)
//         .get('/users/'+userId+'/cards/' + card.id)
//         .auth('Test', 'pass')
//         .send(card)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('name');
//           res.body.should.have.property('_id').eql(card.id);
//           done();
//         });
//       });
//     });
//   });
//   describe('/POST cards', () => {
//     it('it should not POST a new card without name', (done) => {
//       let card = {};
//       chai.request(server)
//         .post('/users/'+userId+'/cards')
//         .auth('Test', 'pass')
//         .send(card)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('errors');
//           res.body.errors.should.have.property('name');
//           res.body.errors.name.should.have.property('kind').eql('required');
//           done();
//         });
//     });
//     it('it should POST a new card', (done) => {
//       let card = {
//         name: "Personal Card"
//       }
//       chai.request(server)
//         .post('/users/'+userId+'/cards')
//         .auth('Test', 'pass')
//         .send(card)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Card added!');
//           res.body.card.should.have.property('name');
//           done();
//         });
//     });
//   });
//   describe('/PUT cards', () => {
//     it('it should UPDATE a card by id', (done) => {
//       let card = new Card({name: "Personal"});
//       card.save((err, card) => {
//         chai.request(server)
//         .put('/users/' + userId + '/cards/' + card.id)
//         .auth('Test', 'pass')
//         .send({name: "Updated"})
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Card updated!');
//           res.body.card.should.have.property('name').eql("Updated");
//           done();
//         });
//       });
//     });
//   });
//   describe('/DELETE cards', () => {
//     it('it should not DELETE other card by id', (done) => {
//       let card = new Card({name: "Personal"});
//       card.save((err, card) => {
//         chai.request(server)
//         .delete('/users/' + userId +'/cards/' + card.id)
//         .auth('Test', 'pass')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Card deleted!');
//           res.body.result.should.have.property('ok').eql(1);
//           res.body.result.should.have.property('n').eql(1);
//           done();
//         });
//       });
//     });
//     it('it should DELETE a card by id', (done) => {
//       let card = new Card({name: "Personal"});
//       card.save((err, card) => {
//         chai.request(server)
//         .delete('/users/' + userId +'/cards/' + card.id)
//         .auth('Test', 'pass')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Card deleted!');
//           res.body.result.should.have.property('ok').eql(1);
//           res.body.result.should.have.property('n').eql(1);
//           done();
//         });
//       });
//     });
//   });
// });
