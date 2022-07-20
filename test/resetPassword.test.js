import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import jwt from 'jsonwebtoken';
chai.use(chaiHttp);

const REQ_URL = '/api/v1/users/resetpassword';
const token = jwt.sign({ email_id: 'hishamunda221015883@gmail.com' }, process.env.EMAIL_CRYPT, { expiresIn: '60s' });
const noUser = jwt.sign({ email_id: 'nouser@example.com' }, process.env.EMAIL_CRYPT, { expiresIn: '60s' });



describe('TESTING RESET PASSWORD END POINTS', () => {

    it('MUST FILL EMAIL FIELD', (done) => {

        chai.request(app)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .send({ email: '' })
            .then((res) => {
                chai.expect(res).to.have.status(400);

                done();
            }).catch((err) => done(err));
    });

    it('MUST NOT REQUEST RESET LINK FOR THE INVALID USER', (done) => {

        chai.request(app)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .send({ email: 'invaliduser@example.com' })
            .then((res) => {
                chai.expect(res).to.have.status(401);

                done();
            }).catch((err) => done(err));
    });

    it('MUST REQUEST RESET LINK FOR THE VALID USER', (done) => {

        chai.request(app)
            .post(REQ_URL)
            .set('Accept', 'application/json')
            .send({ email: 'kwizerageniklenon@gmail.com' })
            .then((res) => {
                chai.expect(res).to.have.status(200);

                done();
            }).catch((err) => done(err));
    });

    it('MUST BAN INVALID LINK TOKEN', (done) => {
        const receivedPattern = 'invalidToken';
        chai.request(app)
            .post(`${REQ_URL}/${receivedPattern}`)
            .set('Accept', 'application/json')
            .send({ password: "123", confirm: "123" })
            .then((res) => {
                chai.expect(res).to.have.status(403);
                done();
            }).catch((err) => done(err));
    });

    it('PASSWORD & CONFIRM MUST MATCH', (done) => {
        chai.request(app)
            .post(`${REQ_URL}/${token}`)
            .set('Accept', 'application/json')
            .send({ password: "123", confirm: "1235" })
            .then((res) => {
                chai.expect(res).to.have.status(400);
                done();
            }).catch((err) => done(err));
    });

    it('MUST NOT RESET FOR INVALID USER', (done) => {
        chai.request(app)
            .post(`${REQ_URL}/${noUser}`)
            .set('Accept', 'application/json')
            .send({ password: "123", confirm: "123" })
            .then((res) => {
                chai.expect(res).to.have.status(401);
                done();
            }).catch((err) => done(err));
    });

    it('MUST RESET FOR VALID USER', (done) => {
        chai.request(app)
            .post(`${REQ_URL}/${token}`)
            .set('Accept', 'application/json')
            .send({ password: "123", confirm: "123" })
            .then((res) => {
                chai.expect(res).to.have.status(200);
                done();
            }).catch((err) => done(err));
    });



})