'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.renameColumn('rooms', 'bedType', 'roomType', {
        transaction,
      });
      await queryInterface.renameColumn('rooms', 'bedCost', 'roomCost', {
        transaction,
      });
      await queryInterface.renameColumn(
        'rooms',
        'bedDescription',
        'roomDescription',
        {
          transaction,
        },
      );
      await queryInterface.removeColumn('rooms', 'uuid', {
        transaction,
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('rooms', 'roomType', {
        transaction,
      });
      await queryInterface.removeColumn('rooms', 'roomCost', {
        transaction,
      });
      await queryInterface.removeColumn('rooms', 'roomDescription', {
        transaction,
      });
    });
  },
};
