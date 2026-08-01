"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Viajes", "horarioId", {
      type: Sequelize.INTEGER,
      allowNull: true,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Viajes", "Viajes_horarioId_fk");
    await queryInterface.removeColumn("Viajes", "horarioId");
  },
};
