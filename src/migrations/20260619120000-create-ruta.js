"use strict";
/** @type {import('sequelize-cli').Migration} */
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
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      destinoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Comunas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      rutaGeometria: {
        type: Sequelize.TEXT,
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
