"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vehiculos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      placa: {
        type: Sequelize.STRING,
      },
      marca: {
        type: Sequelize.STRING,
      },
      modelo: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      capacidadPasajeros: {
        type: Sequelize.INTEGER,
      },
      entidadId: {
        type: Sequelize.INTEGER,
        references: { model: "PerfilEntidads", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("Vehiculos");
  },
};
