'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rates extends Model {
    static associate({ accomodation }) {
      this.belongsTo(accomodation, {
        foreignKey: 'accomodationId',
        as: 'accomodation',
      });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        accomodationId: undefined,
      };
    }
  }
  rates.init(
    {
      rating: DataTypes.INTEGER,
      accomodationId: DataTypes.INTEGER,
      // ratingID:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'rates',
    },
  );
  return rates;
};
