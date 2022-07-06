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
    static associate({
      Room,
      Locationusers,
      Location,
      users,
      UserAccommodation,
    }) {
      this.belongsToMany(users, {
        through: UserAccommodation,
        foreignKey: 'accommodationId',
      });
      this.hasMany(Room, { foreignKey: 'accomodationId', as: 'rooms' });
      this.belongsTo(Location, { foreignKey: 'locationId', as: 'locations' });
    }
    toJSON() {
      return {
        ...this.get(),
      };
    }
  }
  accomodation.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      locationId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      geoLocation: DataTypes.STRING,
      highlight: DataTypes.STRING,
      amenitiesList: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'accomodation',
    },
  );
  return accomodation;
};
