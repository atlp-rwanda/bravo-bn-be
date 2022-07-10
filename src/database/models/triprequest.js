module.exports = (sequelize, DataTypes) => {
  const tripRequest = sequelize.define(
    'tripRequest',
    {
      leavingFrom: DataTypes.STRING,
      goingTo: DataTypes.INTEGER,
      travelDate: DataTypes.STRING,
      returnDate: DataTypes.STRING,
      travelReason: DataTypes.STRING,
      tripType: DataTypes.STRING,
<<<<<<< HEAD
      status: DataTypes.ENUM('pending', 'approved', 'rejected'),
=======
      status: DataTypes.STRING,
      passportName: DataTypes.STRING,
      passportNumber: DataTypes.STRING,
>>>>>>> remember information from travel request
    },
    {},
  );
  tripRequest.associate = function (models) {
    tripRequest.belongsTo(models.users, {
      foreignKey: 'requesterId',
    });
    tripRequest.belongsTo(models.Room, {
      foreignKey: 'roomId',
    });
    tripRequest.belongsTo(models.accomodation, {
      foreignKey: 'accomodationId',
    });

    tripRequest.belongsTo(models.Location, {
      foreignKey: 'goingTo',
    });
    // associations can be defined here
  };
  return tripRequest;
};
