const { VehicleProperty, Category } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const properties = await VehicleProperty.findAll({
      include: [{ model: Category, attributes: ['name'] }],
    });
    res.status(200).json(properties);
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
      res.status(201).json(savedProperty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const updatedProperty = {
      name,
      CategoryId: categoryId,
    };
    try {
      const propertyToUpdate = await VehicleProperty.findOne({ where: { id } });
      if (!propertyToUpdate)
        return res.status(404).json({ error: 'vehicle property not found' });
      await propertyToUpdate.update(updatedProperty);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      const propertyToDelete = await VehicleProperty.findOne({ where: { id } });
      console.log({ propertyToDelete });
      if (!propertyToDelete)
        return res.status(404).json({ error: 'vehicle property not found' });
      await propertyToDelete.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
