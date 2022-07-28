'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('tripRequests', 'passportName', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn('tripRequests', 'passportNumber', {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('tripRequests', 'passportName');
      await queryInterface.removeColumn('tripRequests', 'passportNumber');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
