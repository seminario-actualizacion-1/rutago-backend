const { Sequelize } = require("sequelize");
const config = require("../src/config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: console.log,
});

const migraciones = [
  "ALTER TABLE TiposDocumento ADD COLUMN descripcion VARCHAR(100) DEFAULT NULL AFTER nombre",
  "ALTER TABLE EstadosVehiculo ADD COLUMN descripcion VARCHAR(100) DEFAULT NULL AFTER nombre",
  "ALTER TABLE EstadosViaje ADD COLUMN descripcion VARCHAR(100) DEFAULT NULL AFTER nombre",
  "ALTER TABLE EstadosConductor ADD COLUMN descripcion VARCHAR(100) DEFAULT NULL AFTER nombre",
  "ALTER TABLE Roles ADD COLUMN descripcion VARCHAR(100) DEFAULT NULL AFTER nombreRol",
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");
    for (const sql of migraciones) {
      try {
        await sequelize.query(sql);
        console.log(`OK: ${sql.split("ADD")[0].trim()} -> columna agregada`);
      } catch (err) {
        if (err.message.includes("Duplicate column")) {
          console.log(`Ya existe: ${sql.split("ADD")[0].trim()}`);
        } else {
          console.error(`Error: ${err.message}`);
        }
      }
    }
    console.log("Migración completada.");
  } catch (err) {
    console.error("Error de conexión:", err.message);
  }
  process.exit(0);
})();
