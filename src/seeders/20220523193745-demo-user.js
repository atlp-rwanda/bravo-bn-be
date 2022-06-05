'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [{
    username: 'John Doe1',
    password: "123456",
    fullname: "placide twiringiyimana",
    role: "client",
    email: "twiringiyimanat@gmail.com"
  }], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
