"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Horarios");
    if (!table.fechaInicio) {
      await queryInterface.addColumn("Horarios", "fechaInicio", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Horarios", "fechaInicio");
  },
};
