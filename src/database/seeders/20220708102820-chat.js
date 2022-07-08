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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userName: 'edie',
          message: 'Hello World',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('chats', null, {}),
};
