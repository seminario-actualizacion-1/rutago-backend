"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosVehiculo (id, nombre, descripcion, createdAt, updatedAt) VALUES
      (1, 'EN_TERMINAL', 'Vehículo en terminal disponible', NOW(), NOW()),
      (2, 'EN_RUTA', 'Vehículo en ruta', NOW(), NOW()),
      (3, 'PROXIMO', 'Vehículo próximo a salir', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EstadosVehiculo", null, {});
  },
};
