"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosConductor", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosConductor (id, nombre, createdAt, updatedAt) VALUES
      (1, 'DISPONIBLE', NOW(), NOW()),
      (2, 'EN_VIAJE', NOW(), NOW()),
      (3, 'INACTIVO', NOW(), NOW())
    `);

    const table = await queryInterface.describeTable("PerfilConductors");
    if (!table.estadoId) {
      await queryInterface.addColumn("PerfilConductors", "estadoId", { type: Sequelize.INTEGER, allowNull: true });
    }
    if (table.estado) {
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estadoId = 1 WHERE estado = 'DISPONIBLE'`);
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estadoId = 2 WHERE estado = 'EN_VIAJE'`);
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estadoId = 3 WHERE estado = 'INACTIVO'`);
      await queryInterface.removeColumn("PerfilConductors", "estado");
    }
    try {
      await queryInterface.addConstraint("PerfilConductors", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "PerfilConductors_estadoId_fk",
        references: { table: "EstadosConductor", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME") throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("PerfilConductors");
    if (!table.estado) {
      await queryInterface.addColumn("PerfilConductors", "estado", { type: Sequelize.STRING, allowNull: true });
    }
    if (table.estadoId) {
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estado = 'DISPONIBLE' WHERE estadoId = 1`);
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estado = 'EN_VIAJE' WHERE estadoId = 2`);
      await queryInterface.sequelize.query(`UPDATE PerfilConductors SET estado = 'INACTIVO' WHERE estadoId = 3`);
      await queryInterface.removeColumn("PerfilConductors", "estadoId");
    }
    await queryInterface.dropTable("EstadosConductor");
  },
};
