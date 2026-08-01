"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombreRol: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: Sequelize.STRING(100),
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

    await queryInterface.bulkInsert("Roles", [
      {
        id: 1,
        nombreRol: "Administrador",
        descripcion: "Acceso total al sistema",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombreRol: "Conductor",
        descripcion: "Conductor de vehículos de transporte",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombreRol: "Pasajero",
        descripcion: "Usuario que solicita viajes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nombreRol: "Entidad Externa",
        descripcion: "Empresa de transporte externa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};
