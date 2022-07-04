'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Notifications',
      'tripId',
      Sequelize.INTEGER,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Notifications',
      'tripId',
      Sequelize.INTEGER,
    );
  },
};
