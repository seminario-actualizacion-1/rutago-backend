"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EstadoConductor extends Model {
    static associate(models) {
      EstadoConductor.hasMany(models.PerfilConductor, { foreignKey: "estadoId", as: "perfilesConductor" });
    }
  }
  EstadoConductor.init(
    {
      nombre: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      descripcion: DataTypes.STRING(100),
    },
    { sequelize, modelName: "EstadoConductor", tableName: "EstadosConductor", timestamps: true },
  );
  return EstadoConductor;
};
