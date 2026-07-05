"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosConductor", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const table = await queryInterface.describeTable("PerfilConductors");
    if (!table.estadoId) {
      await queryInterface.addColumn("PerfilConductors", "estadoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "EstadosConductor", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estadoId = 1 WHERE estado = 'DISPONIBLE'
      `);
      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estadoId = 2 WHERE estado = 'EN_VIAJE'
      `);
      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estadoId = 3 WHERE estado = 'INACTIVO'
      `);
    }

    if (table.estado) {
      await queryInterface.removeColumn("PerfilConductors", "estado");
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("PerfilConductors");
    if (!table.estado) {
      await queryInterface.addColumn("PerfilConductors", "estado", {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estado = 'DISPONIBLE' WHERE estadoId = 1
      `);
      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estado = 'EN_VIAJE' WHERE estadoId = 2
      `);
      await queryInterface.sequelize.query(`
        UPDATE PerfilConductors SET estado = 'INACTIVO' WHERE estadoId = 3
      `);
    }

    if (table.estadoId) {
      await queryInterface.removeColumn("PerfilConductors", "estadoId");
    }
    await queryInterface.dropTable("EstadosConductor");
  },
};
