require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const { sequelize } = require("./models");
const usuarioRoutes = require("./routes/usuario.routes");
const rolRoutes = require("./routes/rol.routes");
const comunaRoutes = require("./routes/comuna.routes");
const barrioRoutes = require("./routes/barrio.routes");
const vehiculoRoutes = require("./routes/vehiculo.routes");
const perfilConductorRoutes = require("./routes/perfilconductor.routes");
const perfilEntidadRoutes = require("./routes/perfilentidad.routes");
const viajeRoutes = require("./routes/viaje.routes");

const app = express();

app.use(express.json());
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
        url: process.env.API_URL || `http://localhost:${PORT}`,
        description: "Servidor de RutaGo",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs),
);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/comunas", comunaRoutes);
app.use("/api/barrios", barrioRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/perfiles-conductor", perfilConductorRoutes);
app.use("/api/perfiles-entidad", perfilEntidadRoutes);
app.use("/api/viajes", viajeRoutes);

app.get("/api/ping", (req, res) => {
  res.json({
    status: "ok",
    message: "El servidor de RutaGo está respondiendo",
  });
});

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err.message);
    process.exit(1);
  });
