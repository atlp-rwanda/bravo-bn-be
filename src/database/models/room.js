'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({accomodation}) {
      this.belongsTo(accomodation,{foreignKey:"accomodationId",as:"accomodation"})
    
    }
    toJSON(){   
      return{
        ...this.get(),
        id:undefined,
        accomodationId:undefined
      }
    }
  }
  Room.init({
    uuid:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
    },
    bedType: DataTypes.STRING,
    bedCost: DataTypes.STRING,
    bedDescription: DataTypes.STRING,
    accomodationId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName:"rooms",
    modelName: 'Room',
  });
  return Room;
};