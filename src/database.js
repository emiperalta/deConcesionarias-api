const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
