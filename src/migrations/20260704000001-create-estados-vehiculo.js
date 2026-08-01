"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear catálogo si no existe
    await queryInterface.createTable("EstadosVehiculo", {
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

    // Agregar columna estadoId si no existe
    const table = await queryInterface.describeTable("Vehiculos");
    if (!table.estadoId) {
      await queryInterface.addColumn("Vehiculos", "estadoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    // Agregar FK si no existe
    try {
      await queryInterface.addConstraint("Vehiculos", {
        fields: ["estadoId"],
        type: "foreign key",
        name: "Vehiculos_estadoId_fk",
        references: { table: "EstadosVehiculo", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME") throw e;
    }

    await queryInterface.bulkInsert("EstadosVehiculo", [
      {
        id: 1,
        nombre: "EN_TERMINAL",
        descripcion: "Vehículo en terminal disponible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "EN_RUTA",
        descripcion: "Vehículo en ruta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "PROXIMO",
        descripcion: "Vehículo próximo a salir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Vehiculos");
    if (table.estadoId) {
      await queryInterface.removeColumn("Vehiculos", "estadoId");
    }
    await queryInterface.dropTable("EstadosVehiculo");
  },
};
