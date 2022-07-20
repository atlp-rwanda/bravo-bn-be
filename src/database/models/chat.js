'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define(
    'chat',
    {
      userName: DataTypes.STRING,
      message: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'chat',
    },
  );
  chat.associate = function (models) {
    // associations can be defined here
  };
  return chat;
};
