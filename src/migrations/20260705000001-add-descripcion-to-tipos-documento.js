"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("TiposDocumento");
    if (!table.descripcion) {
      await queryInterface.addColumn("TiposDocumento", "descripcion", {
        type: Sequelize.STRING(100),
        allowNull: true,
      });
    }

    await queryInterface.sequelize.query(`
      UPDATE TiposDocumento SET descripcion = 'Cédula de Ciudadanía' WHERE id = 1 AND descripcion IS NULL
    `);
    await queryInterface.sequelize.query(`
      UPDATE TiposDocumento SET descripcion = 'Tarjeta de Identidad' WHERE id = 2 AND descripcion IS NULL
    `);
    await queryInterface.sequelize.query(`
      UPDATE TiposDocumento SET descripcion = 'Cédula de Extranjería' WHERE id = 3 AND descripcion IS NULL
    `);
    await queryInterface.sequelize.query(`
      UPDATE TiposDocumento SET descripcion = 'Número de Identificación Tributaria' WHERE id = 4 AND descripcion IS NULL
    `);
    await queryInterface.sequelize.query(`
      UPDATE TiposDocumento SET descripcion = 'Pasaporte' WHERE id = 5 AND descripcion IS NULL
    `);
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable("TiposDocumento");
    if (table.descripcion) {
      await queryInterface.removeColumn("TiposDocumento", "descripcion");
    }
  },
};
