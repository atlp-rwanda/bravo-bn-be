'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'tripRequests',
      [
        {
          leavingFrom: 'Rubavu',
          goingTo: 1,
          travelDate: '2022-07-10',
          returnDate: '2022-07-20',
          travelReason: 'vacation',
          tripType: 'one-way',
          status: 'pending',
          requesterId: 1,
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leavingFrom: 'kgl',
          goingTo: 1,
          travelDate: '2022-07-10',
          returnDate: '2022-07-20',
          travelReason: 'product lunch',
          tripType: 'return type',
          status: 'pending',
          requesterId: 1,
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('tripRequests', null, {}),
};