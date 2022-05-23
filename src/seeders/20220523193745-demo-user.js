'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'John Doe',
      password: "123456",
      fullname: "placide twiringiyimana",
      role:"client",
      email:"twiringiyimanat@gmail.com"

    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
