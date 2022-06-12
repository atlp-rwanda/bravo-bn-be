'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leavingFrom: {
        type: Sequelize.STRING
      },
      goingTo: {
        type: Sequelize.STRING
      },
      travelDate: {
        type: Sequelize.STRING
      },
      returnDate: {
        type: Sequelize.STRING
      },
      travelReason: {
        type: Sequelize.STRING
      },
      tripType: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      requesterId: {
        type: Sequelize.INTEGER
      },
      accomodationId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tripRequests');
  }
};