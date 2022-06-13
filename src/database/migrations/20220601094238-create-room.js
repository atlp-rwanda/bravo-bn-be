"use strict";
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable("rooms", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bedType: { type: DataTypes.STRING, allowNull: false },
    bedCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedDescription: { type: DataTypes.STRING, allowNull: false },
    accomodationId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
export async function down(queryInterface, DataTypes) {
  await queryInterface.dropTable("rooms");
}
