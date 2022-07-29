import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
let sampleToken1, sampleToken2, requestId;

const { expect } = chai;

const user1 = {
  firstName: 'sano',
  lastName: 'thierry',
  username: 'sano',
  email: 'sano@gmail.com',
  password: 'thierry',
  repeat_password: 'thierry',
  phoneNumber: '0785058050',
  role: 'requester',
};
const user2 = {
  firstName: 'Samuel',
  lastName: 'Tuyisenge',
  username: 'Samy',
  email: 'tuyisengesamy6@gmail.com',
  password: 'samuel',
  repeat_password: 'samuel',
  phoneNumber: '0785058050',
  role: 'manager',
};

// sign up to get token
describe('User signUp ', () => {
  it('Should signup as manager and return 201', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(user1)
      .end((err, res) => {
        const { message } = res.body;
        sampleToken1 = res.body.token;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });

  it('Should signup as requester and return 201', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(user2)
      .end((err, res) => {
        const { message } = res.body;
        sampleToken2 = res.body.token;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });
});

describe('Get and Post chat message', () => {
  it('should save chat message and return 201', (done) => {
    const message = { message: 'This is Barefoot chat bot' };

    api
      .post('/api/v1/chat/message')
      .set('Authorization', `Bearer ${sampleToken1}`)
      .send(message)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should get all chat messages', (done) => {
    api
      .get('/api/v1/chat/messages')
      .set('Authorization', `Bearer ${sampleToken2}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
