"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EstadosConductor", {
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

    const table = await queryInterface.describeTable("Conductores");
    if (!table.estadoId) {
      await queryInterface.addColumn("Conductores", "estadoId", {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      });
    }
    try {
      await queryInterface.addConstraint("Conductores", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "Conductores_estadoId_fk",
        references: { table: "EstadosConductor", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME" && e.parent?.code !== "42P17")
        throw e;
    }

    await queryInterface.bulkInsert("EstadosConductor", [
      {
        id: 1,
        nombre: "DISPONIBLE",
        descripcion: "Conductor disponible para asignar viajes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "EN_VIAJE",
        descripcion: "Conductor realizando un viaje",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "INACTIVO",
        descripcion: "Conductor inactivo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EstadosConductor");
  },
};
