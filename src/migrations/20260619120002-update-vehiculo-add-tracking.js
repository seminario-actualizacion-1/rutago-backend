"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Vehiculos", "velocidadActual", {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });

    await queryInterface.addColumn("Vehiculos", "latitud", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });

    await queryInterface.addColumn("Vehiculos", "longitud", {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });

    await queryInterface.addColumn("Vehiculos", "ultimaActualizacion", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Vehiculos", "velocidadActual");
    await queryInterface.removeColumn("Vehiculos", "latitud");
    await queryInterface.removeColumn("Vehiculos", "longitud");
    await queryInterface.removeColumn("Vehiculos", "ultimaActualizacion");
  },
};
