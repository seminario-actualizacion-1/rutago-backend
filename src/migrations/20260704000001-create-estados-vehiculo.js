"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosVehiculo", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const table = await queryInterface.describeTable("Vehiculos");
    if (!table.estadoId) {
      await queryInterface.addColumn("Vehiculos", "estadoId", { type: Sequelize.INTEGER, allowNull: true });
    }
    if (table.estado) {
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estadoId = 1 WHERE estado = 'EN_TERMINAL'`);
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estadoId = 2 WHERE estado = 'EN_RUTA'`);
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estadoId = 3 WHERE estado = 'PROXIMO'`);
      await queryInterface.removeColumn("Vehiculos", "estado");
    }
    try {
      await queryInterface.addConstraint("Vehiculos", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "Vehiculos_estadoId_fk",
        references: { table: "EstadosVehiculo", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME") throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Vehiculos");
    if (!table.estado) {
      await queryInterface.addColumn("Vehiculos", "estado", {
        type: Sequelize.ENUM("EN_TERMINAL", "EN_RUTA", "PROXIMO"),
        defaultValue: "EN_TERMINAL",
        allowNull: true,
      });
    }
    if (table.estadoId) {
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estado = 'EN_TERMINAL' WHERE estadoId = 1`);
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estado = 'EN_RUTA' WHERE estadoId = 2`);
      await queryInterface.sequelize.query(`UPDATE Vehiculos SET estado = 'PROXIMO' WHERE estadoId = 3`);
      await queryInterface.removeColumn("Vehiculos", "estadoId");
    }
    await queryInterface.dropTable("EstadosVehiculo");
  },
};
