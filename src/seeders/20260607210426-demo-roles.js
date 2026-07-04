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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nombreRol: "Conductor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nombreRol: "Pasajero",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          nombreRol: "Entidad Externa",
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
