const { Vehicle, VehicleProperty } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const vehicles = await Vehicle.findAll({
      include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
    });
    res.status(200).json(vehicles);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const vehicle = await Vehicle.findOne({
        where: { id },
        include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
      });
      if (!vehicle) return res.status(404).json({ error: 'vehicle not found' });
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createOne: async (req, res) => {
    const { name, properties } = req.body;
    const newVehicle = { name };
    try {
      const savedVehicle = await Vehicle.create(newVehicle);
      if (properties.length) {
        for (const prop of properties) {
          const propInDb = await VehicleProperty.findOne({
            where: { id: prop.value },
          });
          await savedVehicle.addVehicleProperty(propInDb);
        }
      }
      const vehicleToRes = await Vehicle.findOne({
        where: { id: savedVehicle.id },
        include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
      });
      res.status(201).json(vehicleToRes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { name, properties } = req.body;
    const updatedVehicle = { name };
    try {
      const vehicleToUpdate = await Vehicle.findOne({ where: { id } });
      if (!vehicleToUpdate) {
        return res.status(404).json({ error: 'vehicle not found' });
      }
      await vehicleToUpdate.update(updatedVehicle);
      if (properties.length) {
        for (const prop of properties) {
          const propInDb = await VehicleProperty.findOne({
            where: { id: prop.value },
          });
          await vehicleToUpdate.addVehicleProperty(propInDb);
        }
      }
      // TODO: fix update when a property is deleted from vehicle
      // const associations = await vehicleToUpdate.getVehicleProperties();
      // for (const property of properties) {
      //   for (const association of associations) {
      //     if (property.value !== association.dataValues.id) {
      //       console.log('from client: ', property.value);
      //       console.log('from db: ', association.dataValues.id);
      //       vehicleToUpdate.removeVehicleProperty(association);
      //     }
      //     await vehicleToUpdate.addVehicleProperty(propInDb);
      //   }
      // }
      const vehicleToRes = await Vehicle.findOne({
        where: { id },
        include: [{ model: VehicleProperty, attributes: ['id', 'name'] }],
      });
      res.status(200).json(vehicleToRes);
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
      await vehicleToDelete.removeVehicleProperties();
      await vehicleToDelete.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
