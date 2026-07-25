  "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Viaje extends Model {
    static associate(models) {
      Viaje.hasMany(models.ViajePasajero, {
        foreignKey: "viajeId",
        as: "pasajeros",
      });
      Viaje.belongsTo(models.Usuario, {
        foreignKey: "conductorId",
        as: "conductor",
      });
      Viaje.belongsTo(models.Ruta, {
        foreignKey: "rutaId",
        as: "ruta",
      });
      Viaje.belongsTo(models.Horario, {
        foreignKey: "horarioId",
        as: "horario",
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
      rutaId: DataTypes.INTEGER,
      horarioId: DataTypes.INTEGER,
      estadoId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      precioEstimado: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Viaje",
      tableName: "Viajes",
    },
  );
  return Viaje;
};
