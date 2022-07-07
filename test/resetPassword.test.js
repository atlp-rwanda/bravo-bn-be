import chai, { expect } from "chai";
import chaiHttp from "chai-http";
const api = chai.request(server).keepOpen();
import server from '../src/app.js';


chai.use(chaiHttp);

// Get profile
describe("GET API /api/v1/user/forgotpassword", () => {
    const email = {
        email: "hishamunda221015883@gmail.com"
    }
	it("Should return user", (done) => {
		chai
			api
			.post("/api/v1/user/forgotpassword")
			.send(email)
			.end((err, res) => {
				if (err) return done(err);
                expect(res).to.have.status([404]);
				expect(res.body).to.have.property("message");
				return done();
			});
	});

	it("Should return not user found", (done) => {
		const fakeemail = "hish@gmail.com"
		chai
			api
			.post("/api/v1/user/forgotpassword")
			.send(fakeemail)
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property("message");
				return done();
			});
	});
});
