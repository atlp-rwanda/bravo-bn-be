'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs');
const { hash } = bcryptjs;
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    passwordChangedAt: DataTypes.DATE,
    passwordResetExpires: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    role: DataTypes.ENUM(
        'manager', 
        'super user', 
        'requester', 
        'super admin', 
        'travel admin', 
        'travel team member',
        'accommodation supplier'
        )
  }, {
    sequelize,
    modelName: 'users',
  });

  user.beforeSave(async user => {
    user.password = await hash(user.password, 12);

  });

  user.beforeBulkCreate(async (users, options) => {
    for (const user of users) {
      user.password = await hash(user.password, 12);
    }

  });

  return user;
};