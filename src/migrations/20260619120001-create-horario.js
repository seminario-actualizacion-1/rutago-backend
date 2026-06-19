"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Horarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vehiculos",
          key: "id",
        },
      },
      rutaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rutas",
          key: "id",
        },
      },
      horaSalida: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      frecuenciaMinutos: {
        type: Sequelize.INTEGER,
      },
      diasSemana: {
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
    await queryInterface.dropTable("Horarios");
  },
};
