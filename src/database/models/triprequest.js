'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequest = sequelize.define('tripRequest', {
    leavingFrom: DataTypes.STRING,
    goingTo: DataTypes.STRING,
    travelDate: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    travelReason: DataTypes.STRING,
    tripType: DataTypes.STRING,
    status: DataTypes.STRING,
    requesterId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER
  }, {});
  tripRequest.associate = function (models) {
    // associations can be defined here
  };
  return tripRequest;
};
