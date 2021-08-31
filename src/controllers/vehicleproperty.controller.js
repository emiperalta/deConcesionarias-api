const { Category, Vehicle } = require('../models');

const vehiclePropertyService = require('../services/vehicleproperty.service');
const propertyValueService = require('../services/propertyvalue.service');

const HTTP_STATUS = require('../constants/http-status');

const getAll = async (req, res) => {
  try {
    const { categoryId, vehicleId } = req.query;
    let properties;
    let propertiesByCategory;
    if (categoryId && vehicleId) {
      propertiesByCategory = await vehiclePropertyService.getAllVehicleProperties({
        where: { CategoryId: Number(categoryId) },
        include: [{ model: Vehicle, where: { id: Number(vehicleId) } }],
      });
    } else {
      properties = await vehiclePropertyService.getAllVehicleProperties({
        include: [{ model: Category, attributes: ['name'] }],
      });
    }
    res
      .status(HTTP_STATUS.OK)
      .json(categoryId && vehicleId ? propertiesByCategory : properties);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await vehiclePropertyService.getVehiclePropertyById(id);
    if (!property) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: 'vehicle property not found' });
    }
    res.status(HTTP_STATUS.OK).json(property);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const createOne = async (req, res) => {
  const { name, categoryId } = req.body;
  const newProperty = {
    name,
    CategoryId: categoryId,
  };
  try {
    const savedProperty = await vehiclePropertyService.createVehicleProperty(
      newProperty
    );
    const propertyToRes = await vehiclePropertyService.getVehiclePropertyById(
      savedProperty.id,
      { include: [{ model: Category, attributes: ['name'] }] }
    );
    res.status(HTTP_STATUS.CREATED).json(propertyToRes);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, ratingValue } = req.body;
  const { vehicleId } = req.query;
  const updatedProperty = {
    name,
    CategoryId: categoryId,
  };
  try {
    if (vehicleId && ratingValue) {
      const propertyValueToUpdate = await propertyValueService.updatePropertyValue(
        vehicleId,
        id,
        ratingValue
      );
      if (propertyValueToUpdate[0] === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: 'vehicle property not found' });
      }
    } else {
      const property = await vehiclePropertyService.updateVehicleProperty(
        id,
        updatedProperty
      );
      if (property[0] === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: 'vehicle property not found' });
      }
    }
    const propertyToRes = await vehiclePropertyService.getVehiclePropertyById(id, {
      include: [{ model: Category, attributes: ['name'] }, { model: Vehicle }],
    });
    res.status(HTTP_STATUS.OK).json(propertyToRes);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyToDelete = await vehiclePropertyService.deleteVehicleProperty(id);
    if (!propertyToDelete) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: 'vehicle property not found' });
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
