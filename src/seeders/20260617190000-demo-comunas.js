"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existing = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as cnt FROM Comunas",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (existing[0].cnt > 0) return;
    return queryInterface.bulkInsert("Comunas", [
      { nombre: "Comuna 1", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 2", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 3", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 4", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 5", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 6", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 7", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 8", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 9", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 10", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 11", createdAt: new Date(), updatedAt: new Date() },
      { nombre: "Comuna 12", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comunas", null, {});
  },
};
