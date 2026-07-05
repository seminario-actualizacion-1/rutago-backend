"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TiposDocumento", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO TiposDocumento (id, nombre, createdAt, updatedAt) VALUES
      (1, 'CC', NOW(), NOW()),
      (2, 'TI', NOW(), NOW()),
      (3, 'CE', NOW(), NOW()),
      (4, 'NIT', NOW(), NOW()),
      (5, 'PASAPORTE', NOW(), NOW())
    `);

    const table = await queryInterface.describeTable("PerfilPasajeros");
    if (!table.tipoDocumentoId) {
      await queryInterface.addColumn("PerfilPasajeros", "tipoDocumentoId", { type: Sequelize.INTEGER, allowNull: true });
    }
    if (table.tipoDocumento) {
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumentoId = 1 WHERE tipoDocumento = 'CC'`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumentoId = 2 WHERE tipoDocumento = 'TI'`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumentoId = 3 WHERE tipoDocumento = 'CE'`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumentoId = 4 WHERE tipoDocumento = 'NIT'`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumentoId = 5 WHERE tipoDocumento = 'PASAPORTE'`);
      await queryInterface.removeColumn("PerfilPasajeros", "tipoDocumento");
    }
    try {
      await queryInterface.addConstraint("PerfilPasajeros", {
        fields: ["tipoDocumentoId"],
        type: "foreign key",
        name: "PerfilPasajeros_tipoDocumentoId_fk",
        references: { table: "TiposDocumento", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME") throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("PerfilPasajeros");
    if (!table.tipoDocumento) {
      await queryInterface.addColumn("PerfilPasajeros", "tipoDocumento", { type: Sequelize.STRING(10), allowNull: true });
    }
    if (table.tipoDocumentoId) {
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumento = 'CC' WHERE tipoDocumentoId = 1`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumento = 'TI' WHERE tipoDocumentoId = 2`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumento = 'CE' WHERE tipoDocumentoId = 3`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumento = 'NIT' WHERE tipoDocumentoId = 4`);
      await queryInterface.sequelize.query(`UPDATE PerfilPasajeros SET tipoDocumento = 'PASAPORTE' WHERE tipoDocumentoId = 5`);
      await queryInterface.removeColumn("PerfilPasajeros", "tipoDocumentoId");
    }
    await queryInterface.dropTable("TiposDocumento");
  },
};
