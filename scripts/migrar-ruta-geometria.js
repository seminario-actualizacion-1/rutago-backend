const { Sequelize } = require("sequelize");
const config = require("../src/config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host, port: dbConfig.port, dialect: dbConfig.dialect, logging: console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado.");

    try {
      await sequelize.query("ALTER TABLE Rutas ADD COLUMN rutaGeometria TEXT DEFAULT NULL");
      console.log("OK: columna rutaGeometria agregada");
    } catch (err) {
      if (err.message.includes("Duplicate column")) {
        console.log("Ya existe: rutaGeometria");
      } else {
        console.error("Error:", err.message);
      }
    }
  } catch (err) {
    console.error("Error de conexión:", err.message);
  }
  process.exit(0);
})();
