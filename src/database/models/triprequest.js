'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequest = sequelize.define('tripRequest', {
    leavingFrom: DataTypes.STRING,
    goingTo: DataTypes.INTEGER,
    travelDate: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    travelReason: DataTypes.STRING,
    tripType: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  tripRequest.associate = function (models) {
    tripRequest.belongsTo(models.users, {
      foreignKey: 'requesterId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    });
    tripRequest.belongsTo(models.accomodations, {
      foreignKey: 'accomodationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // associations can be defined here
  };
  return tripRequest;
};
