'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    locationName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};