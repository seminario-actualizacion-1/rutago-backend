"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Vehiculos", "estado", {
      type: Sequelize.ENUM("EN_TERMINAL", "EN_RUTA", "PROXIMO"),
      defaultValue: "EN_TERMINAL",
      allowNull: true,
    });
    
    await queryInterface.addColumn("Vehiculos", "latitud", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });
    
    await queryInterface.addColumn("Vehiculos", "longitud", {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });
    
    await queryInterface.addColumn("Vehiculos", "ultimaActualizacion", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Vehiculos", "estado");
    await queryInterface.removeColumn("Vehiculos", "latitud");
    await queryInterface.removeColumn("Vehiculos", "longitud");
    await queryInterface.removeColumn("Vehiculos", "ultimaActualizacion");
  },
};
