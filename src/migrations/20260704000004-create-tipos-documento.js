"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TiposDocumento", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      descripcion: { type: Sequelize.STRING(100), allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const table = await queryInterface.describeTable("Pasajeros");
    if (!table.tipoDocumentoId) {
      await queryInterface.addColumn("Pasajeros", "tipoDocumentoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    try {
      await queryInterface.addConstraint("Pasajeros", {
        fields: ["tipoDocumentoId"],
        type: "foreign key",
        name: "Pasajeros_tipoDocumentoId_fk",
        references: { table: "TiposDocumento", field: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    } catch (e) {
      if (e.parent?.code !== "ER_DUP_KEYNAME" && e.parent?.code !== "42P17")
        throw e;
    }

    await queryInterface.bulkInsert("TiposDocumento", [
      {
        id: 1,
        nombre: "CC",
        descripcion: "Cédula de Ciudadanía",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "TI",
        descripcion: "Tarjeta de Identidad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "CE",
        descripcion: "Cédula de Extranjería",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nombre: "NIT",
        descripcion: "Número de Identificación Tributaria",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nombre: "PASAPORTE",
        descripcion: "Pasaporte",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TiposDocumento");
  },
};
