'use strict';
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('amenities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amenityType: {
      type: DataTypes.STRING
    },
    amenityDescription: {
      type: DataTypes.STRING
    },
    accomodationId:{
      type:DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
}
export function down(queryInterface, DataTypes) {
  return queryInterface.dropTable('amenities');
}