"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barrio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Barrio.belongsTo(models.Comuna, {
        foreignKey: "comunaId",
        as: "comuna",
        onDelete: "RESTRICT",
      });

      Barrio.belongsToMany(models.Ruta, {
        through: models.RutaBarrio,
        foreignKey: "barrioId",
        otherKey: "rutaId",
        as: "rutas",
      });

      Barrio.hasMany(models.RutaBarrio, {
        foreignKey: "barrioId",
        as: "rutaBarrios",
      });
    }
  }
  Barrio.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      comunaId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Barrio",
      tableName: "Barrios",
    },
  );
  return Barrio;
};
