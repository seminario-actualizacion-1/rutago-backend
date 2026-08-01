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
      Vehiculo.belongsTo(models.Entidad, {
        foreignKey: "entidadId",
        as: "entidad",
      });

      Vehiculo.belongsTo(models.EstadoVehiculo, {
        foreignKey: "estadoId",
        as: "estadoVehiculo",
      });

      Vehiculo.hasMany(models.UbicacionVehiculo, {
        foreignKey: "vehiculoId",
        as: "ubicaciones",
      });

      Vehiculo.hasMany(models.Viaje, {
        foreignKey: "vehiculoId",
        as: "viajes",
      });
    }
  }
  Vehiculo.init(
    {
      placa: {
        type: DataTypes.STRING,
        unique: true,
      },
      marca: DataTypes.STRING,
      modelo: DataTypes.STRING,
      color: DataTypes.STRING,
      capacidadPasajeros: DataTypes.INTEGER,
      tipoVehiculo: DataTypes.STRING,
      numeroInterno: DataTypes.STRING,
      entidadId: DataTypes.INTEGER,
      estadoId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      latitud: DataTypes.DECIMAL(10, 8),
      longitud: DataTypes.DECIMAL(11, 8),
      ultimaActualizacion: DataTypes.DATE,
      velocidadActual: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Vehiculo",
      tableName: "Vehiculos",
    },
  );
  return Vehiculo;
};
