"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosViaje (id, nombre, descripcion, createdAt, updatedAt) VALUES
      (1, 'BUSCANDO', 'Buscando conductor disponible', NOW(), NOW()),
      (2, 'ACEPTADO', 'Viaje aceptado por el conductor', NOW(), NOW()),
      (3, 'EN_CURSO', 'Viaje en curso', NOW(), NOW()),
      (4, 'FINALIZADO', 'Viaje finalizado exitosamente', NOW(), NOW()),
      (5, 'CANCELADO', 'Viaje cancelado', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosViaje", null, {});
  },
};
