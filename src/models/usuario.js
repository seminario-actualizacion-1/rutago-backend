"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Rol, { foreignKey: "rolId" });
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
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
    },
  );
  return Usuario;
};
