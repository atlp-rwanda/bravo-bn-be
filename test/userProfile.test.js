import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';

describe('User Profile', () => {
    const unProcessableEntity =422;
    const conflict =409;
    const created =201;
    const user ={
                  email: "uwambaqje1@gmail.com",
                  password: "uwambaje",
              }
    const updateUser={
            firstName: "Samuel",
              lastName: "Doe",
              username: "johnDoe",
              email: "john@gmail.com",
              phoneNumber: "0780591269",
              image: "",
              gender: "male",
              preferredLanguage: "kinyarwanda",
              preferredCurrency: "RWF",
              department: "developers",
              lineManager: "Mugisha Eric"
       }
    it('Should return 200 on successful update user profile', (done) => {
      let token
      api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        console.log(res);
        token=res.body.token
        api.patch('/api/v1/user/update')
        .send(updateUser)
        .set({'Cookie': `jwt=${token}`})
          .end((err,res)=>{
            expect(res.status).to.equal(200)
            done()
          })
    });
  })
  });
