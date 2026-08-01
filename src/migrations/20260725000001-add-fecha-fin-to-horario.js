"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Horarios");
    if (!table.fechaFin) {
      await queryInterface.addColumn("Horarios", "fechaFin", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Horarios", "fechaFin");
  },
};
