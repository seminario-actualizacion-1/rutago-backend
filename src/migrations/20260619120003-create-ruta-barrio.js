"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RutaBarrio", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rutaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Rutas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      barrioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Barrios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("RutaBarrio");
  },
};
