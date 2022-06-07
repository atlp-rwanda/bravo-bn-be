import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
// import { superAdminToken, requesterToken } from './fixtures/users';

import db from '../src/database/models/index.js'
const users = db['users']

chai.should();
chai.use(chaiHTTP);

const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('Setting users roles', () => {
  before(async () => {
    await cleanAlltables();
  });

  it('It should update the user role', (done) => {
    const requestBody = {
      email: 'janedoe@email.com',
      role: 'manager'
    };
    chai.request(app)
      .put('/api/v1/user/roles')
      // .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('It should return User not found', (done) => {
    const requestBody = {
      email: 'janedoeee@email.com',
      role: 'requester'
    };
    chai.request(app)
      .put('/api/v1/user/roles')
      // .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should return invalid token', (done) => {
    const requestBody = {
      email: 'janedoe@email.com',
      role: 'manager'
    };
    chai.request(app)
      .put('/api/v1/user/roles')
      .set('token', 'loremipsum')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return Not Authorized', (done) => {
    const requestBody = {
      email: 'janedoe@gmail.com',
      role: 'requester'
    };
    chai.request(app)
      .put('/api/v1/user/roles')
      // .set('token', requesterToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return Not Authenticated', (done) => {
    const requestBody = {
      email: 'janedoe@gmail.com',
      role: 'manager'
    };
    chai.request(app)
      .put('/api/v1/user/roles')
      .set('token', '')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  })
});