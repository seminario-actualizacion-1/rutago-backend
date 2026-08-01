"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UbicacionesVehiculo", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Vehiculos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      latitud: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      fechaHora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UbicacionesVehiculo");
  },
};
