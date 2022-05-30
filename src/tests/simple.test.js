import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../app.js';

describe("Simple test",()=>{
    it('Should add two numbers', done => {
        const number = 1 + 4
        expect(number).to.equal(5);
        done();
    })

    it('Should get all users', done => {
        api
        .get('/api/v1/user')
      .send()
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              done();
            });
    })
});