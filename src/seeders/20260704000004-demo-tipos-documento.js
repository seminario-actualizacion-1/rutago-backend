"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO TiposDocumento (id, nombre, createdAt, updatedAt) VALUES
      (1, 'CC', NOW(), NOW()),
      (2, 'TI', NOW(), NOW()),
      (3, 'CE', NOW(), NOW()),
      (4, 'NIT', NOW(), NOW()),
      (5, 'PASAPORTE', NOW(), NOW())
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TiposDocumento", null, {});
  },
};
