import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js'
const rooms = db['amenities']

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

  
describe('POST api/v1/amenities/accomodationId', () => {
   
    const amenities={
        amenityType:"hot water2",
        amenityDescription:"5G "
    }
    const amenityUpdate = 
        {
            amenityType:"hot water23",
            amenityDescription:"6G "
        }

    let newToken;
    const accomodationId=2;

    it('Should return 201', (done) => {
        const user ={
            firstName: "Eddimo",
            lastName: "Uwambajimana",
            username: "Eddy123",
            email: "uwambaqe123@gmail.com",
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

    it('should create a amenities according to the accomodation id',(done)=>{
        api
        .post('/api/v1/amenities/'+accomodationId) 
        .set('Authorization',`Bearer ${newToken}`)
        .send(amenities)
        .end((err,res)=>{
            expect(res.status).to.be.equal(201);
            done()
        })
     })
       
          it("Should delete amenities according to id",(done)=>{
            const amenityId = 1;
             api
              .delete("/api/v1/amenities/"+amenityId)
              .set("Authorization", `Bearer ${newToken}`)
              .send()
              .end((err,res)=>{
                if (err) return done(err);
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property("status");
                  expect(res.body).to.have.property("message");
                  return done();
              })
      
        })
     describe("update /api/v1/amenities",()=>{
        const amenityId = 2;
          it("Should update amenity according to id",(done)=>{
              api
              .put("/api/v1/amenities/"+amenityId)
              .set("Authorization", `Bearer ${newToken}`)
              .send(amenityUpdate)
              .end((err,res)=>{
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property("status");
                  expect(res.body).to.have.property("data");
                  return done();
              })
          })
        })
    
})
describe("GET API /api/v1/amenities", () => {

    it("should get all amenity", (done) => {
      chai
        .request(app)
        .get("/api/v1/amenities")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          return done();
        });
    });
    
  });
  describe("GET API /api/v1/amenities", () => {
const id = 2;
    it("should get single amenity", (done) => {
      chai
        .request(app)
        .get("/api/v1/amenities/"+id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          return done();
        });
    });
    
  });
