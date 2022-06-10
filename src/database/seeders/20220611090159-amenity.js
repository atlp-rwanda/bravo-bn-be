'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('amenities', [{

      amenityType:"television",
      amenityDescription:"having two tv in room",
      accomodationId:1,
      createdAt: new Date(),
      updatedAt: new Date()
  }], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('amenities', null, {});
}