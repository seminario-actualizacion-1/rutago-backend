"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO TiposDocumento (id, nombre, descripcion, createdAt, updatedAt) VALUES
      (1, 'CC', 'Cédula de Ciudadanía', NOW(), NOW()),
      (2, 'TI', 'Tarjeta de Identidad', NOW(), NOW()),
      (3, 'CE', 'Cédula de Extranjería', NOW(), NOW()),
      (4, 'NIT', 'Número de Identificación Tributaria', NOW(), NOW()),
      (5, 'PASAPORTE', 'Pasaporte', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TiposDocumento", null, {});
  },
};
