"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosViaje", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const table = await queryInterface.describeTable("Viajes");
    if (!table.estadoId) {
      await queryInterface.addColumn("Viajes", "estadoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "EstadosViaje", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estadoId = 1 WHERE estado = 'BUSCANDO'
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estadoId = 2 WHERE estado = 'ACEPTADO'
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estadoId = 3 WHERE estado = 'EN_CURSO'
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estadoId = 4 WHERE estado = 'FINALIZADO'
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estadoId = 5 WHERE estado = 'CANCELADO'
      `);
    }

    if (table.estado) {
      await queryInterface.removeColumn("Viajes", "estado");
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Viajes");
    if (!table.estado) {
      await queryInterface.addColumn("Viajes", "estado", {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estado = 'BUSCANDO' WHERE estadoId = 1
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estado = 'ACEPTADO' WHERE estadoId = 2
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estado = 'EN_CURSO' WHERE estadoId = 3
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estado = 'FINALIZADO' WHERE estadoId = 4
      `);
      await queryInterface.sequelize.query(`
        UPDATE Viajes SET estado = 'CANCELADO' WHERE estadoId = 5
      `);
    }

    if (table.estadoId) {
      await queryInterface.removeColumn("Viajes", "estadoId");
    }
    await queryInterface.dropTable("EstadosViaje");
  },
};
