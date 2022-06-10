'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('rooms', [{

    bedType:"twin",
    bedCost:"100$",
    bedDescription:"lorem ipsum dolor",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('rooms', null, {});
}
