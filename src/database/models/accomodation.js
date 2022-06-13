'use strict';
module.exports = (sequelize, DataTypes) => {
  const accomodations = sequelize.define('accomodations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    geoLocation: DataTypes.STRING,
    highlight: DataTypes.STRING,
    amenitiesList: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'accomodations',
  });
  accomodations.associate = function (models) {

    // associations can be defined here
  };
  return accomodations;
};