"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PerfilPasajeros", {
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
      tipoDocumento: {
        type: Sequelize.STRING(10),
      },
      numeroDocumento: {
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable("PerfilPasajeros");
  },
};
