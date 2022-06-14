import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js';

const tripRequests = db['tripRequests'];

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
let requesterToken, managerToken, requestId;

const { expect } = chai;
const cleanAlltables = async () => {
    await tripRequests.destroy({ where: {} });
};

// sign up to create requester or manager and get token
describe('User signUp ', () => {
    it('Should create manager and return 201', (done) => {

        const manager = {
            firstName: "mupenzi",
            lastName: "sylvain",
            username: "sylvain",
            email: "marvin@gmail.com",
            password: "semytuyi",
            birthDate: "03-11-1998",
            phoneNumber: "0788888881",
            role: "manager"
        }

        api
            .post('/api/v1/user/auth/signup')
            .send(manager)
            .end((err, res) => {
                managerToken = res.body.token;
                expect(res.status).to.equal(201);
                expect(managerToken);
                done();
            });
    });

    it('Should create requester return 201', (done) => {
        const user = {
            firstName: "Eddy",
            lastName: "Uwambaje",
            username: "Eddy",
            email: "uwambaqje1@gmail.com",
            password: "uwambaje",
            repeat_password: "uwambaje",
            phoneNumber: "0785058050",
            role: "requester"
        }

        api
            .post('/api/v1/user/auth/signup')
            .send(user)
            .end((err, res) => {
                requesterToken = res.body.token;
                expect(res.status).to.equal(201);
                expect(requesterToken);
                done();
            });
    });



});


describe('perform CRUD operations on trip request', () => {
    /* before(async () => {
         await cleanAlltables();
     })*/

    // requester should create trip request
    it('It should create trip request and return 201', (done) => {
        const tripRequest = {
            leavingFrom: "musanze",
            goingTo: "Bugesera",
            travelDate: "2022-10-5",
            returnDate: "2022-11-6",
            travelReason: "picnic",
            status: "pending",
            accomodationId: 3
        };

        api.post('/api/v1/user/trip')
            .set('Authorization', `Bearer ${requesterToken}`)
            .send(tripRequest)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(201);
                expect(message);
                done();
            });

    });

    // manager should not create trip request
    it('It should Deny post and  return 403', (done) => {
        const tripRequest = {
            leavingFrom: "musanze",
            goingTo: "Bugesera",
            travelDate: "2022-10-5",
            returnDate: "2022-11-6",
            travelReason: "picnic",
            status: "pending",
            accomodationId: 3
        };

        api.post('/api/v1/user/trip')
            .set('Authorization', `Bearer ${managerToken}`)
            .send(tripRequest)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(403);
                expect(message);
                done();
            });

    });

    //requester should retrieve all trip request that  he owns
    it('It should get all trip requests and return 200', (done) => {
        api.get('/api/v1/user/trip')
            .set('Authorization', `Bearer ${requesterToken}`)
            .end((err, res) => {
                requestId = res.body.data[0].id;
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });
    });

    //manager should retrieve all trip requests
    it('It should get all trip requests and return 200', (done) => {
        api.get('/api/v1/user/trip')
            .set('Authorization', `Bearer ${managerToken}`)
            .end((err, res) => {
                //requestId = res.body.data[0].id;
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });
    });

    //requester should retrive single trip request by its id
    it('It should get single trip request return 200', (done) => {

        api.get(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${requesterToken}`)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });
    });

    //manager should retrive single trip request by its id
    it('It should get single trip request return 200', (done) => {

        api.get(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${managerToken}`)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });
    });

    // requester should update trip rest which still in appending state
    it('It should update trip request and return 200', (done) => {
        const tripRequest = {
            leavingFrom: "kgl",
            goingTo: "gcity",
            travelDate: "2022-10-5",
            travelReason: "leisure",
            status: "pending",
            accomodationId: 3
        };

        api.patch(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${requesterToken}`)
            .send(tripRequest)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });

    });

    // manager  should not update trip request
    it('It should return 403', (done) => {
        const tripRequest = {
            leavingFrom: "kgl",
            goingTo: "gcity",
            travelDate: "2022-10-5",
            travelReason: "leisure",
            status: "pending",
            accomodationId: 3
        };

        api.patch(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${managerToken}`)
            .send(tripRequest)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(403);
                expect(message);
                done();
            });

    });

    //requester should delete trip request by its id
    it('It should delete trip request and return 200', (done) => {

        api.delete(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${requesterToken}`)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message);
                done();
            });
    });

    //manager should not delete trip request 
    it('It should return 403', (done) => {

        api.delete(`/api/v1/user/trip/${requestId}`)
            .set('Authorization', `Bearer ${managerToken}`)
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(403);
                expect(message);
                done();
            });
    });

});