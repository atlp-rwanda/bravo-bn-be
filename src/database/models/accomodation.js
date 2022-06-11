'use strict';

/////////////////////////////////

'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Room,Amenity}) {
     this.hasMany(Room,{foreignKey:"accomodationId",as:"rooms"})
     this.hasMany(Amenity,{foreignKey:"accomodationId",as:"amenities"})
    }
  }
  accomodation.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    geoLocation: DataTypes.STRING,
    highlight: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'accomodation',
  });
  return accomodation;
};
