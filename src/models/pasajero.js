"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pasajero extends Model {
    static associate(models) {
      Pasajero.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });
      Pasajero.belongsTo(models.TipoDocumento, {
        foreignKey: "tipoDocumentoId",
        as: "tipoDocumento",
      });
      Pasajero.hasMany(models.ViajePasajero, {
        foreignKey: "pasajeroId",
        as: "inscripcionesViaje",
      });
      Pasajero.belongsTo(models.Barrio, {
        foreignKey: "barrioId",
        as: "barrio",
      });
    }
  }
  Pasajero.init(
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      telefono: DataTypes.STRING,
      direccion: DataTypes.STRING,
      tipoDocumentoId: DataTypes.INTEGER,
      barrioId: DataTypes.INTEGER,
      numeroDocumento: {
        type: DataTypes.STRING,
        unique: true,
      },
      fechaNacimiento: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Pasajero",
      tableName: "Pasajeros",
    },
  );
  return Pasajero;
};
