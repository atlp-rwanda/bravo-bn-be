import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';

describe('User sign up', () => {
  const unProcessableEntity = 422;
  const conflict = 409;
  const created = 201;

  it('Should return 422 for the password is greater than 8 long', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje1@gmail.com',
      password: 'uwambajeee',
      repeat_password: 'uwambajeee',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });
  it('Should return 422 for the email is invalid', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqjegmailcom',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });
  it('Should return 422 for the password is alphanumeric', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje@gmail.com',
      password: 'uwa1baje',
      repeat_password: 'uwa1baje',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });

  it('Should return 201', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje1@gmail.com',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };

    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { token } = res.body;
        expect(res.status).to.equal(created);
        expect(token);
        done();
      });
  });

  it('Should return 409 for the provided email or username exist', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje1@gmail.com',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(conflict);
        expect(message).to.equal('Email already taken!');
        done();
      });
  });
});
describe('User login', () => {
  const unProcessableEntity = 422;
  const conflict = 401;
  const success = 200;
  it('Should login user', (done) => {
    const user = {
      email: 'uwambaqje1@gmail.com',
      password: 'uwambaje',
    };
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(success);
        expect(message);
        done();
      });
  });
  it('Should return 401 for the provided worng email or password ', (done) => {
    const user = {
      email: 'wrong@gmail.com',
      password: 'wrong',
    };
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(conflict);
        expect(message);
        done();
      });
  });
  it('Should return 400 for the provided empty fields!', (done) => {
    const user = {};
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message);
        done();
      });
  });
});
describe('logout the user', () => {
  const success = 200;

  it('Should logout the user', (done) => {
    api.post('/api/v1/user/logout').end((err, res) => {
      const { message } = res.body;
      expect(res.status).to.equal(success);
      done();
    });
  });
});
