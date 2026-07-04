const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  horarioController.obtenerTodos
);

router.get("/ruta/:rutaId", authMiddleware.verificarToken, horarioController.obtenerPorRuta);

router.get("/vehiculo/:vehiculoId", authMiddleware.verificarToken, horarioController.obtenerPorVehiculo);

router.get("/:id", authMiddleware.verificarToken, horarioController.obtenerPorId);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.crearHorario
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.actualizarHorario
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.eliminarHorario
);

module.exports = router;
