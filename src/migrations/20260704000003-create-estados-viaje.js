"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosViaje", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO EstadosViaje (id, nombre, createdAt, updatedAt) VALUES
      (1, 'BUSCANDO', NOW(), NOW()),
      (2, 'ACEPTADO', NOW(), NOW()),
      (3, 'EN_CURSO', NOW(), NOW()),
      (4, 'FINALIZADO', NOW(), NOW()),
      (5, 'CANCELADO', NOW(), NOW())
    `);

    const table = await queryInterface.describeTable("Viajes");
    if (!table.estadoId) {
      await queryInterface.addColumn("Viajes", "estadoId", { type: Sequelize.INTEGER, allowNull: true });
    }
    if (table.estado) {
      await queryInterface.sequelize.query(`UPDATE Viajes SET estadoId = 1 WHERE estado = 'BUSCANDO'`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estadoId = 2 WHERE estado = 'ACEPTADO'`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estadoId = 3 WHERE estado = 'EN_CURSO'`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estadoId = 4 WHERE estado = 'FINALIZADO'`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estadoId = 5 WHERE estado = 'CANCELADO'`);
      await queryInterface.removeColumn("Viajes", "estado");
    }
    try {
      await queryInterface.addConstraint("Viajes", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "Viajes_estadoId_fk",
        references: { table: "EstadosViaje", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME") throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Viajes");
    if (!table.estado) {
      await queryInterface.addColumn("Viajes", "estado", { type: Sequelize.STRING, allowNull: true });
    }
    if (table.estadoId) {
      await queryInterface.sequelize.query(`UPDATE Viajes SET estado = 'BUSCANDO' WHERE estadoId = 1`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estado = 'ACEPTADO' WHERE estadoId = 2`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estado = 'EN_CURSO' WHERE estadoId = 3`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estado = 'FINALIZADO' WHERE estadoId = 4`);
      await queryInterface.sequelize.query(`UPDATE Viajes SET estado = 'CANCELADO' WHERE estadoId = 5`);
      await queryInterface.removeColumn("Viajes", "estadoId");
    }
    await queryInterface.dropTable("EstadosViaje");
  },
};
