'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VehicleProperty.belongsToMany(models.Vehicle, { through: 'PropertyValue' });
      VehicleProperty.belongsTo(models.Category);
    }
  }
  VehicleProperty.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      CategoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'VehicleProperty',
    }
  );
  return VehicleProperty;
};
