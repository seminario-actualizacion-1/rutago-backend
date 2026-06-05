// init-db.js
const mysql = require("mysql2");
require("dotenv").config();

// Crear la conexión con las variables de entorno
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS operaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero1 INT NOT NULL,
    numero2 INT NOT NULL,
    resultado INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

console.log("Intentando conectar a la base de datos para inicializar tabla...");

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("❌ Error al crear la tabla:", err.message);
    process.exit(1);
  }
  console.log('🚀 Tabla "operaciones" verificada/creada con éxito.');
  connection.end();
  process.exit(0);
});
