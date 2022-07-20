'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'chats',
      [
        {
          id: 1,
          userName: 'samy',
          message: 'Welcome to Barefoot',
          date: '2022',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userName: 'edie',
          message: 'Hello World',
          date: '2022',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('chats', null, {}),
};
