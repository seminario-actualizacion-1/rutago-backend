"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ViajePasajeros", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      viajeId: { type: Sequelize.INTEGER, allowNull: false },
      pasajeroId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
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
      references: { table: "Pasajeros", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addIndex("ViajePasajeros", ["viajeId", "pasajeroId"], {
      unique: true,
      name: "ViajePasajeros_viajeId_pasajeroId_unique",
    });

    const viajes = await queryInterface.describeTable("Viajes");
    if (viajes.pasajeroId) {
      const filas = await queryInterface.sequelize.query(
        `SELECT id, "pasajeroId" FROM "Viajes" WHERE "pasajeroId" IS NOT NULL`,
        { type: queryInterface.sequelize.QueryTypes.SELECT },
      );

      for (const viaje of filas) {
        await queryInterface.sequelize.query(
          `INSERT INTO "ViajePasajeros" ("viajeId", "pasajeroId", "createdAt", "updatedAt") VALUES (?, ?, NOW(), NOW())`,
          { replacements: [viaje.id, viaje.pasajeroId] },
        );
      }

      await queryInterface.removeColumn("Viajes", "pasajeroId");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ViajePasajeros");
  },
};
