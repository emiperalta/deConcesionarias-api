const vehicleRoutes = require('./vehicle.routes');
const vehiclePropertyRoutes = require('./vehicleproperty.routes');
const categoryRoutes = require('./category.routes');

const createApp = app => {
  app.use('/api/vehicles', vehicleRoutes);
  app.use('/api/vehicle-properties', vehiclePropertyRoutes);
  app.use('/api/categories', categoryRoutes);
};

module.exports = createApp;
