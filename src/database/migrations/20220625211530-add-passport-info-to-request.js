'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'tripRequests',
      'passportName',
      Sequelize.STRING,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tripRequests', 'passportName');
  },
};
