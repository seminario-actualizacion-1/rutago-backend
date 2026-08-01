"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Rol, { foreignKey: "rolId", as: "rol" });
      Usuario.hasOne(models.Conductor, {
        foreignKey: "usuarioId",
        as: "conductor",
      });
      Usuario.hasOne(models.Entidad, {
        foreignKey: "usuarioId",
        as: "entidad",
      });
      Usuario.hasOne(models.Pasajero, {
        foreignKey: "usuarioId",
        as: "pasajero",
      });

    }
  }
  Usuario.init(
    {
      nombres: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      contrasena: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
    },
  );
  return Usuario;
};
