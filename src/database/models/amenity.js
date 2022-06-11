'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Amenity extends Model {
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
        accomodationId:undefined
      }
    }
  }
  Amenity.init({

    amenityType: DataTypes.STRING,
    amenityDescription: DataTypes.STRING,
    accomodationId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName:"amenities",
    modelName: 'Amenity',
  });
  return Amenity;
};