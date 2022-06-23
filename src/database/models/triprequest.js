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
    accomodationId: DataTypes.INTEGER
  }, {});
  tripRequest.associate = function (models) {
    tripRequest.belongsTo(models.users, {
      foreignKey: 'requesterId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    });

    /* this is test
    static associate({ users, UserAccommodation }) {
      this.belongsToMany(users, {
        through: UserAccommodation,
        foreignKey: 'accommodationId',
      });*/
    // associations can be defined here
  };
  return tripRequest;
};
