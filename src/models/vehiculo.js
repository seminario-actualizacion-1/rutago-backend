"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehiculo.belongsTo(models.PerfilEntidad, { foreignKey: "entidadId" });
      Vehiculo.hasMany(models.PerfilConductor, { foreignKey: "vehiculoId" });
    }
  }
  Vehiculo.init(
    {
      placa: DataTypes.STRING,
      marca: DataTypes.STRING,
      modelo: DataTypes.STRING,
      color: DataTypes.STRING,
      capacidadPasajeros: DataTypes.INTEGER,
      entidadId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vehiculo",
    },
  );
  return Vehiculo;
};
