"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      Rol.hasMany(models.Usuario, { foreignKey: "rolId" });
    }
  }
  Rol.init(
    {
      nombreRol: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      descripcion: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
    },
  );
  return Rol;
};
