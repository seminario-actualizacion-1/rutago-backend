require("dotenv").config();

module.exports = {
  puerto: process.env.PORT || 8082,
  apiUrl: process.env.API_URL || "http://localhost:8082",
  entorno: process.env.NODE_ENV || "development",

  jwt: {
    secreto: process.env.JWT_SECRET,
    expiracion: process.env.JWT_EXPIRES_IN || "8h",
    refreshExpiracion: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  db: {
    host: process.env.HOST || "localhost",
    puerto: process.env.PORT_DB || 3306,
    usuario: process.env.USER_DB || "root",
    password: process.env.DB_PASSWORD,
    nombre: process.env.DB_NAME || "rutago_db",
  },

  cors: {
    origen:
      process.env.CORS_ORIGIN ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  },
};
