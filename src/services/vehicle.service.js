const { Category, Vehicle, VehicleProperty } = require('../models');

const getAllVehicles = async (filters = {}) => {
  return await Vehicle.findAll(filters);
};

const getVehicleById = async (id, filters = {}) => {
  return await Vehicle.findOne({ where: { id }, ...filters });
};

const createVehicle = async data => {
  return await Vehicle.create(data);
};

const updateVehicle = async (id, data) => {
  return await Vehicle.update(data, { where: { id } });
};

const deleteVehicle = async id => {
  return await Vehicle.destroy({ where: { id } });
};

module.exports = {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
};
