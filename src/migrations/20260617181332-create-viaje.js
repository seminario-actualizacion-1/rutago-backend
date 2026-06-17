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
      pasajeroId: {
        type: Sequelize.INTEGER,
        references: { model: "Usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      conductorId: {
        type: Sequelize.INTEGER,
        references: { model: "Usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      barrioOrigenId: {
        type: Sequelize.INTEGER,
        references: { model: "Barrios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      barrioDestinoId: {
        type: Sequelize.INTEGER,
        references: { model: "Barrios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      estado: {
        type: Sequelize.STRING,
      },
      precioEstimado: {
        type: Sequelize.DECIMAL,
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
