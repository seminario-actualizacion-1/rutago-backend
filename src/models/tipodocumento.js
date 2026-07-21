"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TipoDocumento extends Model {
    static associate(models) {
      TipoDocumento.hasMany(models.PerfilPasajero, { foreignKey: "tipoDocumentoId", as: "perfilesPasajero" });
    }
  }
  TipoDocumento.init(
    {
      nombre: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      descripcion: DataTypes.STRING(100),
    },
    { sequelize, modelName: "TipoDocumento", tableName: "TiposDocumento", timestamps: true },
  );
  return TipoDocumento;
};
