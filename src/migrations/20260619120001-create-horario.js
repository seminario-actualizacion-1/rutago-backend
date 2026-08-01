"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Horarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rutaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rutas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      fechaInicio: {
        type: Sequelize.DATEONLY,
      },
      fechaFin: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Horarios");
  },
};
