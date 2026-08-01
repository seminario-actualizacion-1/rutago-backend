"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosViaje", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      descripcion: { type: Sequelize.STRING(100), allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const table = await queryInterface.describeTable("Viajes");
    if (!table.estadoId) {
      await queryInterface.addColumn("Viajes", "estadoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
      });
    }
    try {
      await queryInterface.addConstraint("Viajes", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "Viajes_estadoId_fk",
        references: { table: "EstadosViaje", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME" && e.parent?.code !== "42P17")
        throw e;
    }

    await queryInterface.bulkInsert("EstadosViaje", [
      {
        id: 1,
        nombre: "BUSCANDO",
        descripcion: "Buscando conductor disponible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "ACEPTADO",
        descripcion: "Viaje aceptado por el conductor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "EN_CURSO",
        descripcion: "Viaje en curso",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nombre: "FINALIZADO",
        descripcion: "Viaje finalizado exitosamente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nombre: "CANCELADO",
        descripcion: "Viaje cancelado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Viajes");
    if (table.estadoId) {
      await queryInterface.removeColumn("Viajes", "estadoId");
    }
    await queryInterface.dropTable("EstadosViaje");
  },
};
