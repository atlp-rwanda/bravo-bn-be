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
		const fakeemail = "h@gmail.com"
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

describe("PUT API /api/v1/user/resetpassword/", () => {
	const userData = {
		email: "xldivin@gmail.com",
		password: "1111",
	};
    const userData2 = {
		email: "xldivin@gmail.com",
		password: "1111",
		confirmPassword: "1112"
	};
    const userData3 = {
		email: "h@gmail.com",
		password: "1111",
		confirmPassword: "1111"
	};
   
}) 