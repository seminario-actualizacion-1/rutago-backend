const express = require("express");
const router = express.Router();
const vehiculoController = require("../controllers/vehiculo.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  vehiculoController.obtenerTodos
);

router.get("/:id", authMiddleware.verificarToken, vehiculoController.obtenerPorId);

router.get("/:id/ubicacion", authMiddleware.verificarToken, vehiculoController.obtenerUbicacion);

router.put(
  "/:id/ubicacion",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  vehiculoController.actualizarUbicacion
);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  vehiculoController.crearVehiculo
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  vehiculoController.actualizarVehiculo
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  vehiculoController.eliminarVehiculo
);

module.exports = router;
