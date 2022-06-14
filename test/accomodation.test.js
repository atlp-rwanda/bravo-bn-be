import chai from "chai";
import chaiHTTP from "chai-http";
import app from "../src/app.js";
import db from "../src/database/models/index.js";
const rooms = db["accomodations"];

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

describe("POST api/v1/accomodations/", () => {
  const accomodation = {
    name: "marriot",
    description: "name",
    location: "kigali",
    image: "images",
    geoLocation: "234",
    highlight: "simple",
  };
  const accomodation1 = {
    name: "marriot",
    description: "name",
    location: "kigali",
    image: "images",
    geoLocation: "234",
    highlight: "simple",
  };

  let newToken;

  it("Should return 201", (done) => {
    const user = {
      firstName: "Eddy",
      lastName: "Uwambaje",
      username: "Eddy54",
      email: "uwambaqje54@gmail.com",
      password: "uwambaje",
      repeat_password: "uwambaje",
      phoneNumber: "0785058050",
      role: "travel admin",
    };

    api
      .post("/api/v1/user/auth/signup")
      .send(user)
      .end((err, res) => {
        const { token } = res.body;
        newToken = token;
        done();
      });
  });

  it("should create an accomodation ", (done) => {
    api
      .post("/api/v1/accomodation/create")
      .set("Authorization", `Bearer ${newToken}`)
      .send(accomodation)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  describe("delete api /api/v1/accomodation", () => {
    const roomId = 1;
    it("Should delete accomodation according to id", (done) => {
      chai
        .request(app)
        .delete("/api/v1/accomodation/delete/" + roomId)
        .set("Authorization", `Bearer ${newToken}`)
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          return done();
        });
    });
  });
  describe("update /api/v1/accomodation/update", () => {
    const accomodatiomId = 1;
    it("Should update accomodation according to id", (done) => {
      api
        .put("/api/v1/accomodation/update/" + accomodatiomId)
        .set("Authorization", `Bearer ${newToken}`)
        .send(accomodation1)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message");
          return done();
        });
    });
  });
});

describe("GET API /api/v1/accomodation", () => {
  it("should get all accomodation", (done) => {
    chai
      .request(app)
      .get("/api/v1/accomodation")
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("data");
        expect(res.body).to.have.property("message");
        return done();
      });
  });
});

describe("GET API /api/v1/accomodation", () => {
  const id = 2;
  it("should get single accomodation", (done) => {
    chai
      .request(app)
      .get("/api/v1/accomodation/" + id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("data");
        return done();
      });
  });
});
