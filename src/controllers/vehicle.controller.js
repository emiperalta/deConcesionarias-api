const { Vehicle, VehicleProperty } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const vehicles = await Vehicle.findAll({
      include: [{ model: VehicleProperty, attributes: ['name'] }],
    });
    res.status(200).json(vehicles);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const vehicle = await Vehicle.findOne({
        where: { id },
        include: [{ model: VehicleProperty, attributes: ['name'] }],
      });
      if (!vehicle) return res.status(404).json({ error: 'vehicle not found' });
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createOne: async (req, res) => {
    const { name } = req.body;
    const newVehicle = {
      name,
    };
    try {
      const savedVehicle = await Vehicle.create(newVehicle);
      res.status(201).json(savedVehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedVehicle = {
      name,
    };
    try {
      const vehicleToUpdate = await Vehicle.findOne({ where: { id } });
      if (!vehicleToUpdate)
        return res.status(404).json({ error: 'vehicle not found' });
      await vehicleToUpdate.update(updatedVehicle);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      const vehicleToDelete = await Vehicle.findOne({ where: { id } });
      if (!vehicleToDelete)
        return res.status(404).json({ error: 'vehicle not found' });
      await vehicleToDelete.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
