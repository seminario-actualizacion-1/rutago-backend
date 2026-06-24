"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerfilConductor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PerfilConductor.belongsTo(models.Usuario, { foreignKey: "usuarioId", as: "usuario" });
      PerfilConductor.belongsTo(models.Vehiculo, { foreignKey: "vehiculoId", as: "vehiculo" });
    }
  }
  PerfilConductor.init(
    {
      usuarioId: DataTypes.INTEGER,
      vehiculoId: DataTypes.INTEGER,
      licenciaConducir: DataTypes.STRING,
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PerfilConductor",
    },
  );
  return PerfilConductor;
};
