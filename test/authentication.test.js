import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';
const unProcessableEntity = 422;
const conflict = 409;
const created = 201;
const unAuthorized = 401;
const success = 200;

describe('User sign up', () => {
    const unProcessableEntity =422;
    const conflict =409;
    const created =201;
    
    it('Should return 422 for the password is greater than 8 long', (done) => {
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje1@gmail.com",
            password: "uwambajeee",
            repeat_password: "uwambajeee",
            phoneNumber: "25078505805",
            role: "requester"
        }
      api
      .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          const { message } = res.body;
          console.log(message);
          expect(res.status).to.equal(unProcessableEntity);
          expect(message);
          done();
        });
    });
    it('Should return 422 for the email is invalid', (done) => {
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqjegmailcom",
            password: "uwambaje",
            repeat_password: "uwambaje",
            phoneNumber: "25078505805",
            role: "requester"
        }
        api
        .post('/api/v1/user/signup')
          .send(user)
        .send(user)
        .end((err, res) => {
          const { message } = res.body;
          console.log(res.body);
          expect(res.status).to.equal(unProcessableEntity);
          expect(message);
          done();
        });
    });
    it('Should return 422 for the password is alphanumeric',(done)=> {
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje@gmail.com",
            password: "uwa1baje",
            repeat_password: "uwa1baje",
            phoneNumber: "25078505805",
            role: "requester"
        }
        api
        .post('/api/v1/user/signup')
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
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje1@gmail.com",
            password: "uwambaje",
            repeat_password: "uwambaje",
            phoneNumber: "25078505805",
            role: "requester"
        }

        api
        .post('/api/v1/user/signup')
          .send(user)
        .end((err, res) => {
          const { token } = res.body;
          expect(res.status).to.equal(created);
          expect(token);
          done();
        });
    });

    it('Should return 409 for the provided email or username exist', (done) => {
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje1@gmail.com",
            password: "uwambaje",
            repeat_password: "uwambaje",
            phoneNumber: "25078505805",
            role: "requester"
        }
        api
        .post('/api/v1/user/signup')
          .send(user)
        .end((err, res) => {
          const { message } = res.body;
          expect(res.status).to.equal(conflict);
          expect(message).to.equal('Email already taken!');
          done();
        });
    });
  });
