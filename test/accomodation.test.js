import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js'
const rooms = db['accomodations']

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

  
describe('POST api/v1/accomodations/', () => {
   const accomodation = {
    name:"marriot",
    description:"name",
    location:"kigali",
    image:"images",
    geoLocation:"234",
    highlight:"simple",
    amenities:"bag"

   }

    let newToken;

    it('Should return 201', (done) => {
        const user ={
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje1@gmail.com",
            password: "uwambaje",
            repeat_password: "uwambaje",
            phoneNumber: "0785058050",
            role: "travel admin"
        }

        api
        .post('/api/v1/user/auth/signup')
          .send(user)
        .end((err, res) => {
          const { token } = res.body;
          newToken = token
          done()
        });
    });

    it('should create a room according to the accomodation id',(done)=>{
        api
        .post('/api/v1/accomodation/create') 
        .set('Authorization',`Bearer ${newToken}`)
        .send(accomodation)
        .end((err,res)=>{
            expect(res.status).to.be.equal(201);
            done()
        })
     })
     describe("delete api /api/v1/accomodation",()=>{
        const roomId = 1;
          it("Should delete accomodation according to id",(done)=>{
              chai
              .request(app)
              .delete("/api/v1/accomodation/delete/"+roomId)
              .set("Authorization", `Bearer ${newToken}`)
              .send()
              .end((err,res)=>{
                if (err) return done(err);
                  expect(res).to.have.status(200);
                  return done();
              })
          })
        })
 
    
})

describe("GET API /api/v1/accomodation", () => {

    it("should get all accomodation", (done) => {
      chai
        .request(app)
        .get("/api/v1/accomodation")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          return done();
        });
    });
    
  });

  describe("GET API /api/v1/accomodation", () => {
    const id = 2;
        it("should get single accomodation", (done) => {
          chai
            .request(app)
            .get("/api/v1/accomodation/"+id)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a("object");
              return done();
            });
        });
        
      });
    
      describe("Like/Unlike accommodation",()=>{
        const user ={  
          email:"uwambaqje1@gmail.com",
          password: "uwambaje",
      }
        it("Should return 200 for success",(done)=>{
          let token
      api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        token=res.body.token
        api.put('/api/v1/accomodation/like/2')
        .set('Authorization',`Bearer ${token}`)
          .end((err,res)=>{
            expect(res.status).to.equal(200)
            done()
          })
    });
        })
        it("Should return 400 for unavailable accommodation id",(done)=>{
          let token
      api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        token=res.body.token
        api.put('/api/v1/accomodation/like/00')
        .set('Authorization',`Bearer ${token}`)
          .end((err,res)=>{
            expect(res.status).to.equal(400)
            done()
          })
    });
        })
        it("Should return 401 for unauthorization",(done)=>{
        api.put('/api/v1/accomodation/like/00')
          .end((err,res)=>{
            expect(res.status).to.equal(401)
            done()
          })
    });
        })
  
    
   