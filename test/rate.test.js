import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';
import db from '../src/database/models/index.js';

const User = db['users'];
const TripRequest = db['tripRequest'];

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;

describe('User rating accomodation', () => {
  const user = {
    firstName: 'Rose',
    lastName: 'Reine',
    username: 'Rose',
    email: 'rosemwiseneza5@gmail.com',
    password: 'mwisenez',
    repeat_password: 'mwisenez',
    phoneNumber: '0780850683',
    role: 'requester',
  };
  const tripRequest = {
    leavingFrom: 'musanze',
    goingTo: 1,
    travelDate: '2022-10-5',
    returnDate: '2022-11-6',
    travelReason: 'picnic',
    accomodationId: 1,
  };

  it('Should return 201 on successfully rated accomodation', (done) => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const id = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .post('/api/v1/user/trip')
                .set('Authorization', `Bearer ${token}`)
                .send(tripRequest)
                .end((err, res) => {
                  const tripId = res.body.data.id;
                  TripRequest.update(
                    {
                      status: 'approved',
                      travelDate:
                        new Date(TripRequest.travelDate).getTime() -
                        24 * 60 * 60 * 1000,
                    },
                    { where: { id: tripId } },
                  ).then((result) => {
                    const rate = {
                      rates: '2',
                      tripRequestId: tripId,
                    };
                    api
                      .post('/api/v1/rates/createRate')
                      .set('Authorization', `Bearer ${token}`)
                      .send(rate)
                      .end((err, res) => {
                        expect(res.status).to.equal(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal(
                          'rates added to accomodation!',
                        );
                        done();
                      });
                  });
                });
            });
        });
      });
  });
});
