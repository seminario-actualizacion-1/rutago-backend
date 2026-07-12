require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const errorHandler = require("./middlewares/error.middleware");

const { sequelize } = require("./models");
const usuarioRoutes = require("./routes/usuario.routes");
const rolRoutes = require("./routes/rol.routes");
const comunaRoutes = require("./routes/comuna.routes");
const barrioRoutes = require("./routes/barrio.routes");
const vehiculoRoutes = require("./routes/vehiculo.routes");
const perfilConductorRoutes = require("./routes/perfilconductor.routes");
const perfilEntidadRoutes = require("./routes/perfilentidad.routes");
const viajeRoutes = require("./routes/viaje.routes");
const rutaRoutes = require("./routes/ruta.routes");
const horarioRoutes = require("./routes/horario.routes");
const perfilPasajeroRoutes = require("./routes/perfilpasajero.routes");

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Demasiadas solicitudes, intente de nuevo más tarde" },
});

app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de RutaGo",
      version: "1.0.0",
      description: "Documentación de la API para RutaGo",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local (desarrollo)",
      },
      {
        url: "https://rutago.seminario1.eleueleo.com/api",
        description: "Producción (VPS)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs),
);
app.use("/api/usuarios/login", authLimiter);
app.use("/api/usuarios/registro", authLimiter);
app.use("/api/usuarios/recuperar-contrasena", authLimiter);
app.use("/api/usuarios/cambiar-contrasena", authLimiter);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/comunas", comunaRoutes);
app.use("/api/barrios", barrioRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/perfiles-conductor", perfilConductorRoutes);
app.use("/api/perfiles-entidad", perfilEntidadRoutes);
app.use("/api/viajes", viajeRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/perfiles-pasajero", perfilPasajeroRoutes);

app.get("/api/ping", (req, res) => {
  res.json({
    status: "ok",
    message: "El servidor de RutaGo está respondiendo",
  });
});

app.use(errorHandler);

const iniciarServidor = async () => {
  if (process.env.NODE_ENV !== "production") {
    await sequelize.sync();
    console.log("Base de datos sincronizada (modo desarrollo).");
  }
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

iniciarServidor().catch((err) => {
  console.error("No se pudo conectar a la base de datos:", err.message);
  process.exit(1);
});
