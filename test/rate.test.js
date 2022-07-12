// import chai from 'chai';
// import chaiHttp from 'chai-http';

// chai.use(chaiHttp);
// const api = chai.request(server).keepOpen();
// const { expect } = chai;
// import server from '../src/app.js';

// describe('Accomodation rating testing', () => {
//   const user = {
//     firstName: 'Rose',
//     lastName: 'Reine',
//     username: 'Rose31',
//     email: 'mwisemarierose@gmail.com',
//     password: 'uwambaje',
//     repeat_password: 'mwiseneza',
//     phoneNumber: '0780850683',
//     role: 'requester',
//   };
//   const rateUser = {
//     rates:'2',
//     tripRequestId:'3',
//   };
//   it('Should return 201 on successful rated accomodation', (done) => {
//     let token;
//     api
//       .post('/api/v1/user/auth/signup')
//       .send(user)
//       .end((err, res) => {
//         token = res.body.token;
//         api
//           .patch('/api/v1/rate/createRate')
//           .send(rateUser)
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             expect(res.status).to.equal(201);
//             expect(res.body).to.have.property('message');
//             expect(res.body.message).to.equal('rates added to accomodation!');
//             done();
//           });
//       });
//   });
// });
