"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerfilPasajero extends Model {
    static associate(models) {
      PerfilPasajero.belongsTo(models.Usuario, { foreignKey: "usuarioId", as: "usuario" });
    }
  }
  PerfilPasajero.init(
    {
      usuarioId: DataTypes.INTEGER,
      telefono: DataTypes.STRING,
      direccion: DataTypes.STRING,
      tipoDocumento: DataTypes.STRING,
      numeroDocumento: DataTypes.STRING,
      fechaNacimiento: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "PerfilPasajero",
      tableName: "PerfilPasajeros",
    },
  );
  return PerfilPasajero;
};
