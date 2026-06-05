const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config(); // Permite leer un archivo .env si pruebas localmente

const app = express();

// Middlewares importantes
app.use(express.json()); // Permite que Express entienda el formato JSON que envía React
app.use(cors()); // Evita los errores de CORS al conectar Front y Back

// El puerto lo define el VPS (8082) mediante las variables de entorno de GitHub Actions
const PORT = process.env.PORT || 8082;

// Configuración del Pool de conexiones a MySQL usando tus secretos de GitHub
const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 1. Ruta POST para recibir los números, sumarlos y guardarlos en la BD
app.post("/api/sumar", (req, res) => {
  const { num1, num2 } = req.body;

  // Validación básica por si llegan datos vacíos
  if (num1 === undefined || num2 === undefined) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Faltan los números num1 o num2 en el cuerpo de la petición",
      });
  }

  // Convertimos a enteros para asegurar la operación matemática
  const numero1 = parseInt(num1);
  const numero2 = parseInt(num2);
  const resultado = numero1 + numero2;

  // Consulta SQL para insertar el registro
  const query =
    "INSERT INTO operaciones (numero1, numero2, resultado) VALUES (?, ?, ?)";

  db.query(query, [numero1, numero2, resultado], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos MySQL:", err);
      return res
        .status(500)
        .json({
          success: false,
          error: "Error interno en el servidor al intentar guardar en la BD",
        });
    }

    // Si todo sale bien, respondemos con éxito al Frontend
    res.json({
      success: true,
      message: "¡Suma registrada en la base de datos con éxito!",
      resultado: resultado,
    });
  });
});

// 2. Ruta GET de diagnóstico simple para comprobar que el Back está "vivo"
app.get("/api/ping", (req, res) => {
  res.json({
    status: "ok",
    message: "El servidor de Express está respondiendo en el puerto 8082",
  });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de pruebas corriendo correctamente en el puerto ${PORT}`,
  );
});
