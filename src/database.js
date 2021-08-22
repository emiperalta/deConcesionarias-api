const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('\nConnection has been established successfully.\n');
    await sequelize.sync({ force: false });
    console.log('\nSynchronized tables\n');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
