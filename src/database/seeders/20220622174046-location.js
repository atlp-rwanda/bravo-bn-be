'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('location', [{
      id: '1',
      locationName: 'kigali',
      description: 'Rwanda, Kigali',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      locationName: 'Rubavu',
      description: 'Rwanda, Rubavu',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      locationName: 'Nairobi',
      description: 'Kenya, Nairobi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      locationName: 'Dodoma',
      description: 'Tanzania',
      createdAt: new Date(),
      updatedAt: new Date()

    }
    ], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('location', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
