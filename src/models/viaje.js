"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Viaje extends Model {
    static associate(models) {
      Viaje.hasMany(models.ViajePasajero, {
        foreignKey: "viajeId",
        as: "pasajeros",
      });

      Viaje.belongsTo(models.Conductor, {
        foreignKey: "conductorId",
        as: "conductor",
      });

      Viaje.belongsTo(models.Horario, {
        foreignKey: "horarioId",
        as: "horario",
      });

      Viaje.belongsTo(models.Vehiculo, {
        foreignKey: "vehiculoId",
        as: "vehiculo",
      });

      Viaje.belongsTo(models.EstadoViaje, {
        foreignKey: "estadoId",
        as: "estadoViaje",
      });
    }
  }
  Viaje.init(
    {
      conductorId: DataTypes.INTEGER,
      horarioId: DataTypes.INTEGER,
      vehiculoId: DataTypes.INTEGER,
      estadoId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      precioEstimado: DataTypes.DECIMAL,
      horaInicio: DataTypes.DATE,
      horaFin: DataTypes.DATE,
      kilometrosRecorridos: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Viaje",
      tableName: "Viajes",
    },
  );
  return Viaje;
};
