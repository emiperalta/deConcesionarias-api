const { Category, PropertyValue, VehicleProperty, Vehicle } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const { categoryId, vehicleId } = req.query;
      let properties;
      let propertiesByCategory;
      if (categoryId) {
        propertiesByCategory = await VehicleProperty.findAll({
          where: { CategoryId: Number(categoryId) },
          include: [{ model: Vehicle, where: { id: Number(vehicleId) } }],
        });
      } else {
        properties = await VehicleProperty.findAll({
          include: [{ model: Category, attributes: ['name'] }],
        });
      }
      res.status(200).json(categoryId ? propertiesByCategory : properties);
    } catch (error) {
      console.log({ error: error.message });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const property = await VehicleProperty.findOne({ where: { id } });
      if (!property)
        return res.status(404).json({ error: 'vehicle property not found' });
      res.status(200).json(property);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createOne: async (req, res) => {
    const { name, categoryId } = req.body;
    const newProperty = {
      name,
      CategoryId: categoryId,
    };
    try {
      const savedProperty = await VehicleProperty.create(newProperty);
      const propertyToRes = await VehicleProperty.findOne({
        where: { id: savedProperty.id },
        include: [{ model: Category, attributes: ['name'] }],
      });
      res.status(201).json(propertyToRes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { name, categoryId, ratingValue } = req.body;
    const { vehicleId } = req.query;
    const updatedProperty = {
      name,
      CategoryId: categoryId,
    };
    try {
      if (vehicleId) {
        const propertyValueToUpdate = await PropertyValue.findOne({
          where: { VehicleId: Number(vehicleId), VehiclePropertyId: Number(id) },
        });
        if (!propertyValueToUpdate)
          return res.status(404).json({ error: 'vehicle property not found' });
        await propertyValueToUpdate.update({ value: ratingValue });
      } else {
        const propertyToUpdate = await VehicleProperty.findOne({
          where: { id: Number(id) },
        });
        if (!propertyToUpdate)
          return res.status(404).json({ error: 'vehicle property not found' });
        await propertyToUpdate.update(updatedProperty);
      }
      const propertyToRes = await VehicleProperty.findOne({
        where: { id },
        include: [{ model: Category, attributes: ['name'] }, { model: Vehicle }],
      });
      res.status(200).json(propertyToRes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      const propertyToDelete = await VehicleProperty.findOne({ where: { id } });
      if (!propertyToDelete) {
        return res.status(404).json({ error: 'vehicle property not found' });
      }
      await propertyToDelete.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
