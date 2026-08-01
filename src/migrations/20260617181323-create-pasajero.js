"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pasajeros", {
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
      telefono: {
        type: Sequelize.STRING(20),
      },
      direccion: {
        type: Sequelize.STRING(255),
      },
      tipoDocumentoId: {
        type: Sequelize.INTEGER,
      },
      barrioId: {
        type: Sequelize.INTEGER,
      },
      numeroDocumento: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
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
  async down(queryInterface) {
    await queryInterface.dropTable("Pasajeros");
  },
};
