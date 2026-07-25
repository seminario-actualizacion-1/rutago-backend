"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosConductor (id, nombre, descripcion, createdAt, updatedAt) VALUES
      (1, 'DISPONIBLE', 'Conductor disponible para asignar viajes', NOW(), NOW()),
      (2, 'EN_VIAJE', 'Conductor realizando un viaje', NOW(), NOW()),
      (3, 'INACTIVO', 'Conductor inactivo', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosConductor", null, {});
  },
};
