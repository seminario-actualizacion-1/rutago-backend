"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rutas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Comunas",
          key: "id",
        },
      },
      destinoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Comunas",
          key: "id",
        },
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
      distanciaKm: {
        type: Sequelize.DECIMAL,
      },
      tiempoEstimadoMinutos: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Rutas");
  },
};
