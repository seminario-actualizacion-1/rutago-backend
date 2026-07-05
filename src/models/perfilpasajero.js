"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerfilPasajero extends Model {
    static associate(models) {
      PerfilPasajero.belongsTo(models.Usuario, { foreignKey: "usuarioId", as: "usuario" });
      PerfilPasajero.belongsTo(models.TipoDocumento, { foreignKey: "tipoDocumentoId", as: "tipoDocumento" });
    }
  }
  PerfilPasajero.init(
    {
      usuarioId: DataTypes.INTEGER,
      telefono: DataTypes.STRING,
      direccion: DataTypes.STRING,
      tipoDocumentoId: DataTypes.INTEGER,
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
