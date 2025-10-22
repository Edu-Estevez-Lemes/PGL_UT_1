'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alquileres', [
      { id: 1, fecha_inicio: new Date('2025-10-01'), fecha_fin: new Date('2025-10-05'), clienteId: 1, peliculaId: 1 },
      { id: 2, fecha_inicio: new Date('2025-10-03'), fecha_fin: new Date('2025-10-08'), clienteId: 2, peliculaId: 2 },
      { id: 3, fecha_inicio: new Date('2025-10-04'), fecha_fin: new Date('2025-10-10'), clienteId: 3, peliculaId: 3 },
      { id: 4, fecha_inicio: new Date('2025-10-06'), fecha_fin: new Date('2025-10-12'), clienteId: 1, peliculaId: 2 },
      { id: 5, fecha_inicio: new Date('2025-10-07'), fecha_fin: new Date('2025-10-11'), clienteId: 2, peliculaId: 1 }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alquileres', null, {});
  }
};
