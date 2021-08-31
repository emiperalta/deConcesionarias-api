const { Category, PropertyValue, VehicleProperty, Vehicle } = require('../models');

const getAllVehicleProperties = async (filters = {}) => {
  return await VehicleProperty.findAll(filters);
};

const getVehiclePropertyById = async (id, filters = {}) => {
  return await VehicleProperty.findOne({ where: { id }, ...filters });
};

const createVehicleProperty = async data => {
  return await VehicleProperty.create(data);
};

const updateVehicleProperty = async (id, data) => {
  return await VehicleProperty.update(data, { where: { id } });
};

const deleteVehicleProperty = async id => {
  return await VehicleProperty.destroy({ where: { id } });
};

module.exports = {
  createVehicleProperty,
  deleteVehicleProperty,
  getAllVehicleProperties,
  getVehiclePropertyById,
  updateVehicleProperty,
};
