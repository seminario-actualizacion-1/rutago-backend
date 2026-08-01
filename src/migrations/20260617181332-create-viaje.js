"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Viajes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      conductorId: {
        type: Sequelize.INTEGER,
        references: { model: "Conductores", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        references: { model: "Vehiculos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      precioEstimado: {
        type: Sequelize.DECIMAL,
      },
      horaInicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      horaFin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      kilometrosRecorridos: {
        type: Sequelize.DECIMAL,
        allowNull: true,
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
    await queryInterface.dropTable("Viajes");
  },
};
