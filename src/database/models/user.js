'use strict';
const { Model } = require('sequelize');
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
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      preferredCurrency: DataTypes.STRING,
      department: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      passwordChangedAt: DataTypes.STRING,
      passwordResetExpires: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      socialMediaId: DataTypes.STRING,
      provider: DataTypes.STRING,
      gender: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      verificationToken: DataTypes.STRING,
      role: DataTypes.ENUM(
        'manager',
        'super user',
        'requester',
        'super admin',
        'travel admin',
        'travel team member',
        'accommodation supplier',
      ),
    },
    {
      sequelize,
      modelName: 'users',
    },
  );

  return user;
};
