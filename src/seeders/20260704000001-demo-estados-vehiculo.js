"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosVehiculo (id, nombre, createdAt, updatedAt) VALUES
      (1, 'EN_TERMINAL', NOW(), NOW()),
      (2, 'EN_RUTA', NOW(), NOW()),
      (3, 'PROXIMO', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosVehiculo", null, {});
  },
};
