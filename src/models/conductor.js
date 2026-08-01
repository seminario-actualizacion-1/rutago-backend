"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conductor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conductor.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });
      Conductor.belongsTo(models.EstadoConductor, {
        foreignKey: "estadoId",
        as: "estadoConductor",
      });
      Conductor.hasMany(models.Viaje, {
        foreignKey: "conductorId",
        as: "viajesComoConductor",
      });
    }
  }
  Conductor.init(
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      licenciaConducir: DataTypes.STRING,
      estadoId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Conductor",
      tableName: "Conductores",
    },
  );
  return Conductor;
};
