import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
let requesterToken, managerToken, requestId;

const { expect } = chai;

const requester = {
  firstName: 'sano',
  lastName: 'thierry',
  username: 'sano',
  email: 'sano@gmail.com',
  password: 'thierry',
  repeat_password: 'thierry',
  phoneNumber: '0785058050',
  role: 'requester',
};
const manager = {
  firstName: 'Samuel',
  lastName: 'Tuyisenge',
  username: 'Samy',
  email: 'tuyisengesamy6@gmail.com',
  password: 'samuel',
  repeat_password: 'samuel',
  phoneNumber: '0785058050',
  role: 'manager',
};

// sign up to create requester or manager and get token
describe('User signUp ', () => {
  it('Should signup as manager and return 201', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(requester)
      .end((err, res) => {
        const { message } = res.body;
        requesterToken = res.body.token;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });

  it('Should signup as requester and return 201', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(manager)
      .end((err, res) => {
        const { message } = res.body;
        managerToken = res.body.token;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });
});

describe('perform CRUD operations on trip request', () => {
  // requester should create trip request
  it('It should create trip request and return 201', (done) => {
    const tripRequest = {
      leavingFrom: 'musanze',
      goingTo: 1,
      travelDate: '2022-10-5',
      returnDate: '2022-11-6',
      travelReason: 'picnic',
      accomodationId: 2,
      roomId: 3,
    };

    api
      .post('/api/v1/user/trip')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });

  it('It should not create trip and  return 403', (done) => {
    const tripRequest = {
      leavingFrom: 'musanze',
      goingTo: 1,
      travelDate: '2022-10-5',
      returnDate: '2022-11-6',
      travelReason: 'picnic',
      accomodationId: 1,
      roomId: 1,
    };

    api
      .post('/api/v1/user/trip')
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
  it('Requester should get all trip requests and return 200', (done) => {
    api
      .get('/api/v1/user/trip/get')
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
  it('Manager should get all trip requests and return 200', (done) => {
    api
      .get('/api/v1/user/trip/get')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        requestId = res.body.data[0].id;
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        done();
      });
  });

  //requester should retrive single trip request by its id
  it('Requester should get single trip request return 200', (done) => {
    api
      .get(`/api/v1/user/trip/get/${requestId}`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        done();
      });
  });

  //manager should retrive single trip request by its id
  it('Manager should get single trip request return 200', (done) => {
    api
      .get(`/api/v1/user/trip/get/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        done();
      });
  });

  // requester should update trip rest which still in appending state
  it('Requester should update trip request and return 201', (done) => {
    const tripRequest = {
      leavingFrom: 'kgl',
      travelDate: '2022-10-5',
      travelReason: 'leisure',
    };

    api
      .patch(`/api/v1/user/trip/update/${requestId}`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(201);
        expect(message);
        done();
      });
  });

  // manager  should not update trip request
  it('Manger should not update and return 403', (done) => {
    const tripRequest = {
      leavingFrom: 'kgl',
      goingTo: 1,
      travelDate: '2022-10-5',
      travelReason: 'leisure',
    };

    api
      .patch(`/api/v1/user/trip/update/${requestId}`)
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
    api
      .delete(`/api/v1/user/trip/${requestId}`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        done();
      });
  });

  //manager should not delete trip request
  it('It should return 403 for Unauthorized', (done) => {
    api
      .delete(`/api/v1/user/trip/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(403);
        expect(message);
        done();
      });
  });

  it('It should return 404 for most travelled destinations will not be found', (done) => {
    api
      .get(`/api/v1/user/trip//most-travelled-destinations`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should not create multi trip request and return 404', (done) => {
    const tripRequest = [
      {
        leavingFrom: 'musanze',
        goingTo: 20,
        travelDate: '2022-10-5',
        returnDate: '2022-11-6',
        travelReason: 'picnic',
        accomodationId: 2,
        roomId: 3,
      },
    ];

    api
      .post('/api/v1/user/trip/multi')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message);
        done();
      });
  });
  it('It should not create multi trip request and return 404', (done) => {
    const tripRequest = [
      {
        leavingFrom: 'musanze',
        goingTo: 1,
        travelDate: '2022-10-5',
        returnDate: '2022-11-6',
        travelReason: 'picnic',
        accomodationId: 20,
        roomId: 3,
      },
    ];

    api
      .post('/api/v1/user/trip/multi')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message);
        done();
      });
  });
  it('It should not create multi trip request and return 404', (done) => {
    const tripRequest = [
      {
        leavingFrom: 'musanze',
        goingTo: 1,
        travelDate: '2022-10-5',
        returnDate: '2022-11-6',
        travelReason: 'picnic',
        accomodationId: 2,
        roomId: 34,
      },
    ];

    api
      .post('/api/v1/user/trip/multi')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message);
        done();
      });
  });

  it('It should create multi trip request and return 201', (done) => {
    const tripRequest = [
      {
        leavingFrom: 'musanze',
        goingTo: 1,
        travelDate: '2022-10-5',
        returnDate: '2022-11-6',
        travelReason: 'picnic',
        accomodationId: 2,
        roomId: 3,
      },
    ];

    api
      .post('/api/v1/user/trip/multi')
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
  it('It should not multi create trip and  return 403', (done) => {
    const tripRequest = [
      {
        leavingFrom: 'musanze',
        goingTo: 1,
        travelDate: '2022-10-5',
        returnDate: '2022-11-6',
        travelReason: 'picnic',
        accomodationId: 1,
        roomId: 1,
      },
    ];

    api
      .post('/api/v1/user/trip/multi')
      .set('Authorization', `Bearer ${managerToken}`)
      .send(tripRequest)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(403);
        expect(message);
        done();
      });
  });
});

describe('Approve Trip Request', () => {
  it('Should return 200 for success ', (done) => {
    const tripRequest = {
      leavingFrom: 'musanze',
      goingTo: 1,
      travelDate: '2022-10-5',
      returnDate: '2022-11-6',
      travelReason: 'picnic',
      accomodationId: 1,
    };
    api
      .post('/api/v1/user/trip')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        api
          .get('/api/v1/user/trip/get')
          .set('Authorization', `Bearer ${requesterToken}`)
          .send(tripRequest)
          .end((err, res) => {
            requestId = res.body.data[0].id;
            api
              .put(`/api/v1/user/trip/approve/${requestId}`)
              .set('Authorization', `Bearer ${managerToken}`)
              .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(200);
                expect(message).to.equal('Trip request approved successfully');
                done();
              });
          });
      });
  });
  it('It should return 200 for most travelled destinations', (done) => {
    api
      .get(`/api/v1/user/trip//most-travelled-destinations`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Should return 404 for invalid trip request id', (done) => {
    api
      .put('/api/v1/user/trip/approve/0000')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message).to.equal('Trip request not found');
        done();
      });
  });

  it('Should return 401 for invalid token', (done) => {
    const token = 'res.body';
    api
      .put(`/api/v1/user/trip/approve/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(401);
        expect(message).to.equal('Your token is invalid or expired');
        done();
      });
  });
  it('should return 400 for Trip request is already approved or rejected ', (done) => {
    api
      .put(`/api/v1/user/trip/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message).to.equal(
          'Trip request is already approved or rejected',
        );
        done();
      });
  });
});

describe('Reject Trip Request', () => {
  it('it should create new trip request and return 201', (done) => {
    const tripRequest = {
      leavingFrom: 'musanze',
      goingTo: 1,
      travelDate: '2022-10-5',
      returnDate: '2022-11-6',
      travelReason: 'picnic',
      accomodationId: 1,
    };
    api
      .post('/api/v1/user/trip')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send(tripRequest)
      .end((err, res) => {
        api
          .get('/api/v1/user/trip/get')
          .set('Authorization', `Bearer ${requesterToken}`)
          .send(tripRequest)
          .end((err, res) => {
            requestId = res.body.data[0].id;
            done();
          });
      });
    it('Should return 200 for success ', (done) => {
      api
        .put(`/api/v1/user/trip/reject/${requestId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
          const { message } = res.body;
          expect(res.status).to.equal(200);
          expect(message).to.equal('Trip request rejected successfully');
          done();
        });
    });
  });
  it('Should return 404 for invalid trip request id', (done) => {
    api
      .put('/api/v1/user/trip/reject/0000')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message).to.equal('Trip request not found');
        done();
      });
  });
  it('Should return 401 for invalid token', (done) => {
    const token = 'res.body';
    api
      .put(`/api/v1/user/trip/reject/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(401);
        expect(message).to.equal('Your token is invalid or expired');
        done();
      });
  });
  it('should return 400 for Trip request is already approved or rejected ', (done) => {
    api
      .put(`/api/v1/user/trip/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message).to.equal(
          'Trip request is already approved or rejected',
        );
        done();
      });
  });
});
