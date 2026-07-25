"use strict";

const { Rol } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cnt = await Rol.count();
    if (cnt > 0) return;
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          nombreRol: "Administrador",
          descripcion: "Acceso total al sistema",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nombreRol: "Conductor",
          descripcion: "Conductor de vehículos de transporte",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nombreRol: "Pasajero",
          descripcion: "Usuario que solicita viajes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          nombreRol: "Entidad Externa",
          descripcion: "Empresa de transporte externa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
