'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('accomodations', [{
    name: 'marriot',
    description: "we offer everything",
    location: "kigali",
    image: "url",
    geoLocation: "5 rooms",
    highlight: "deal",
    amenities: "hellooo",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('accomodations', null, {});
}
