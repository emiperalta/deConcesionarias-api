'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * creo una variable para guardar registros con valores por defecto, agregué la funcion new Date()
     * porque sin eso, me creaba un registro con fecha de creacion 0000-00-00 00:00:00
     */
    const categories = [
      {
        name: 'Documentación y mantenimiento',
        icon: 'https://i.imgur.com/hT4B6pd.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruedas, frenos, suspensión y dirección',
        icon: 'https://i.imgur.com/y8G37jm.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carrocería',
        icon: 'https://i.imgur.com/qRbngoP.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Motor',
        icon: 'https://i.imgur.com/psu4rQo.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alumbrado',
        icon: 'https://i.imgur.com/ThXAruJ.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Volante y tablero',
        icon: 'https://i.imgur.com/Mpnj0Zf.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Interior y asientos',
        icon: 'https://i.imgur.com/8NInkwJ.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Interior general',
        icon: 'https://i.imgur.com/fu9GZd9.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
