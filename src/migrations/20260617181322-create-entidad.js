"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Entidades", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: { model: "Usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      razonSocial: {
        type: Sequelize.STRING,
      },
      nit: {
        type: Sequelize.STRING,
        unique: true,
      },
      telefonoContacto: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Entidades");
  },
};
