'use strict';

/////////////////////////////////

'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class accommodations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,UserAccommodation}) {
     this.belongsToMany(users, {
      through: UserAccommodation,
      foreignKey: 'accommodationId',
    });
    }
  }
  accommodations.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    geoLocation: DataTypes.STRING,
    highlight: DataTypes.STRING,    
  }, {
    sequelize,
    modelName: 'accommodations',
  });
  return accommodations;
};
