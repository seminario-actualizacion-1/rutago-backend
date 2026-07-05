"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TiposDocumento", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.addColumn("PerfilPasajeros", "tipoDocumentoId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "TiposDocumento", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumentoId = 1 WHERE tipoDocumento = 'CC'
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumentoId = 2 WHERE tipoDocumento = 'TI'
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumentoId = 3 WHERE tipoDocumento = 'CE'
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumentoId = 4 WHERE tipoDocumento = 'NIT'
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumentoId = 5 WHERE tipoDocumento = 'PASAPORTE'
    `);

    await queryInterface.removeColumn("PerfilPasajeros", "tipoDocumento");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("PerfilPasajeros", "tipoDocumento", {
      type: Sequelize.STRING(10),
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumento = 'CC' WHERE tipoDocumentoId = 1
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumento = 'TI' WHERE tipoDocumentoId = 2
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumento = 'CE' WHERE tipoDocumentoId = 3
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumento = 'NIT' WHERE tipoDocumentoId = 4
    `);
    await queryInterface.sequelize.query(`
      UPDATE PerfilPasajeros SET tipoDocumento = 'PASAPORTE' WHERE tipoDocumentoId = 5
    `);

    await queryInterface.removeColumn("PerfilPasajeros", "tipoDocumentoId");
    await queryInterface.dropTable("TiposDocumento");
  },
};
