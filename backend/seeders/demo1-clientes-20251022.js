'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [
      { id: 1, nombre: 'María Antonia Casalls', email: 'macasalls@myemail.com', telefono: '689547412' },
      { id: 2, nombre: 'Andrea Santana', email: 'masantana@micorreo.es', telefono: '623623547' },
      { id: 3, nombre: 'Samuel Moreno', email: 'smoreno@micorreo.es', telefono: '699554778' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};

