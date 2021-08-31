const { PropertyValue } = require('../models');

const updatePropertyValue = async (vehicleId, propertyId, data) => {
  return await PropertyValue.update(
    { value: data },
    {
      where: { VehicleId: vehicleId, VehiclePropertyId: propertyId },
    }
  );
};

module.exports = { updatePropertyValue };
