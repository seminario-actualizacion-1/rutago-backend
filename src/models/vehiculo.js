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
      Vehiculo.belongsTo(models.PerfilEntidad, { foreignKey: "entidadId", as: "perfilEntidad" });
      Vehiculo.hasMany(models.PerfilConductor, { foreignKey: "vehiculoId", as: "perfilesConductor" });
      Vehiculo.belongsTo(models.EstadoVehiculo, { foreignKey: "estadoId", as: "estadoVehiculo" });
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
      estadoId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      latitud: DataTypes.DECIMAL(10, 8),
      longitud: DataTypes.DECIMAL(11, 8),
      ultimaActualizacion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Vehiculo",
      tableName: "Vehiculos",
    },
  );
  return Vehiculo;
};
