"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Viajes", "rutaId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "id",
    });

    await queryInterface.addColumn("Viajes", "horarioId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "rutaId",
    });

    await queryInterface.addConstraint("Viajes", {
      fields: ["rutaId"],
      type: "foreign key",
      name: "Viajes_rutaId_fk",
      references: { table: "Rutas", field: "id" },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Viajes", {
      fields: ["horarioId"],
      type: "foreign key",
      name: "Viajes_horarioId_fk",
      references: { table: "Horarios", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Viajes", "Viajes_horarioId_fk");
    await queryInterface.removeConstraint("Viajes", "Viajes_rutaId_fk");
    await queryInterface.removeColumn("Viajes", "horarioId");
    await queryInterface.removeColumn("Viajes", "rutaId");
  },
};
