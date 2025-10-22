'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('peliculas', [
      { id: 1, titulo: 'El Señor de los Anillos: La Comunidad del Anillo', genero: 'Fantasía', anio: 2001, disponible: true },
      { id: 2, titulo: 'Matrix', genero: 'Ciencia ficción', anio: 1999, disponible: true },
      { id: 3, titulo: 'Gladiator', genero: 'Acción', anio: 2000, disponible: true }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('peliculas', null, {});
  }
};

