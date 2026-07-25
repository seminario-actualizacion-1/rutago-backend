"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ViajePasajeros", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      viajeId: { type: Sequelize.INTEGER, allowNull: false },
      pasajeroId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });

    await queryInterface.addConstraint("ViajePasajeros", {
      fields: ["viajeId"],
      type: "foreign key",
      name: "ViajePasajeros_viajeId_fk",
      references: { table: "Viajes", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("ViajePasajeros", {
      fields: ["pasajeroId"],
      type: "foreign key",
      name: "ViajePasajeros_pasajeroId_fk",
      references: { table: "Usuarios", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addIndex("ViajePasajeros", ["viajeId", "pasajeroId"], {
      unique: true,
      name: "ViajePasajeros_viajeId_pasajeroId_unique",
    });

    const viajes = await queryInterface.sequelize.query(
      `SELECT id, pasajeroId FROM Viajes WHERE pasajeroId IS NOT NULL`,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    for (const viaje of viajes) {
      await queryInterface.sequelize.query(
        `INSERT INTO ViajePasajeros (viajeId, pasajeroId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`,
        { replacements: [viaje.id, viaje.pasajeroId] },
      );
    }

    await queryInterface.removeColumn("Viajes", "pasajeroId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Viajes", "pasajeroId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    const relaciones = await queryInterface.sequelize.query(
      `SELECT viajeId, pasajeroId FROM ViajePasajeros`,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    for (const r of relaciones) {
      await queryInterface.sequelize.query(
        `UPDATE Viajes SET pasajeroId = ? WHERE id = ? AND pasajeroId IS NULL`,
        { replacements: [r.pasajeroId, r.viajeId] },
      );
    }

    await queryInterface.dropTable("ViajePasajeros");
  },
};
