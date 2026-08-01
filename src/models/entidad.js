"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entidad.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });
      Entidad.hasMany(models.Vehiculo, {
        foreignKey: "entidadId",
        as: "vehiculos",
      });
    }
  }
  Entidad.init(
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      razonSocial: DataTypes.STRING,
      nit: {
        type: DataTypes.STRING,
        unique: true,
      },
      telefonoContacto: DataTypes.STRING,
      direccion: DataTypes.STRING,
      correo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Entidad",
      tableName: "Entidades",
    },
  );
  return Entidad;
};
