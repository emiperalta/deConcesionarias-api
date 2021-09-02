const { Category, Vehicle, VehicleProperty } = require('../models');

const vehicleService = require('../services/vehicle.service');
const vehiclePropertyService = require('../services/vehicleproperty.service');

const HTTP_STATUS = require('../constants/http-status');

const getAll = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles({
      include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
    });
    res.status(HTTP_STATUS.OK).json(vehicles);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleService.getVehicleById(id, {
      include: [
        { model: VehicleProperty, attributes: ['id', 'name'], include: Category },
      ],
    });
    if (!vehicle) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'vehicle not found' });
    }
    res.status(HTTP_STATUS.OK).json(vehicle);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const createOne = async (req, res) => {
  const { name, properties } = req.body;
  const newVehicle = { name };
  try {
    const savedVehicle = await vehicleService.createVehicle(newVehicle);
    if (properties && properties.length) {
      for (const prop of properties) {
        const propInDb = await vehiclePropertyService.getVehiclePropertyById(
          prop.value
        );
        await savedVehicle.addVehicleProperty(propInDb);
      }
    }
    const vehicleToRes = await vehicleService.getVehicleById(savedVehicle.id, {
      include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
    });
    res.status(HTTP_STATUS.CREATED).json(vehicleToRes);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { name, properties } = req.body;
  const updatedVehicle = { name };
  try {
    const vehicleToUpdate = await vehicleService.updateVehicle(id, updatedVehicle);
    if (vehicleToUpdate[0] === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'vehicle not found' });
    }
    if (properties && properties.length) {
      const vehicle = await vehicleService.getVehicleById(id);
      for (const prop of properties) {
        const propInDb = await vehiclePropertyService.getVehiclePropertyById(
          prop.value
        );
        await vehicle.addVehicleProperty(propInDb);
      }
    }
    const vehicleToRes = await vehicleService.getVehicleById(id, {
      include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
    });
    res.status(HTTP_STATUS.OK).json(vehicleToRes);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { propertyId } = req.query;
  try {
    const vehicle = await vehicleService.getVehicleById(id);
    if (!vehicle) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'vehicle not found' });
    }
    if (propertyId) {
      const propertyToDelete = await vehiclePropertyService.getVehiclePropertyById(
        propertyId
      );
      if (!propertyToDelete) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: 'vehicle property not found' });
      }
      await vehicle.removeVehicleProperty(propertyToDelete);
    } else {
      await vehicle.removeVehicleProperties();
      await vehicleService.deleteVehicle(id);
    }
    res.status(HTTP_STATUS.NO_CONTENT).end();
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
};
