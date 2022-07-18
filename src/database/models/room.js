'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ accomodation, users }) {
      this.belongsTo(accomodation, {
        foreignKey: 'accomodationId',
        as: 'accomodation',
      });
      this.belongsTo(users, { foreignKey: 'userId', as: 'user' });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        accomodationId: undefined,
        userId: undefined,
      };
    }
  }
  Room.init(
    {
      roomType: DataTypes.STRING,
      roomCost: DataTypes.STRING,
      roomDescription: DataTypes.STRING,
      taken: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: DataTypes.INTEGER,
      accomodationId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'rooms',
      modelName: 'Room',
    },
  );
  return Room;
};
