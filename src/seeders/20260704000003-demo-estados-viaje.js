"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosViaje (id, nombre, createdAt, updatedAt) VALUES
      (1, 'BUSCANDO', NOW(), NOW()),
      (2, 'ACEPTADO', NOW(), NOW()),
      (3, 'EN_CURSO', NOW(), NOW()),
      (4, 'FINALIZADO', NOW(), NOW()),
      (5, 'CANCELADO', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosViaje", null, {});
  },
};
