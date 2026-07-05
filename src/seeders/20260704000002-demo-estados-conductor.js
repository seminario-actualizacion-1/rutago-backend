"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosConductor (id, nombre, createdAt, updatedAt) VALUES
      (1, 'DISPONIBLE', NOW(), NOW()),
      (2, 'EN_VIAJE', NOW(), NOW()),
      (3, 'INACTIVO', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosConductor", null, {});
  },
};
