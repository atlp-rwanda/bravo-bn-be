'use strict';
module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define(
    'locations',
    {
      locationName: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'locations',
    },
  );
  locations.associate = function (models) {
    // associations can be defined here
  };
  return locations;
};
