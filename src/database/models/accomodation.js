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
    static associate(models) {
      // define association here
    }
  }
  accomodation.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    availability: DataTypes.STRING,
    highlight: DataTypes.STRING,
    amenities: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accomodation',
  });
  return accomodation;
};
