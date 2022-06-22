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
        allowNull: false,
        type: Sequelize.STRING
      },
      goingTo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      travelDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      returnDate: {
        type: Sequelize.STRING
      },
      travelReason: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tripType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      requesterId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      accomodationId: {
        allowNull: false,
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