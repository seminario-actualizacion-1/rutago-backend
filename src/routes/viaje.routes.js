const express = require("express");
const router = express.Router();
const viajeController = require("../controllers/viaje.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarPaginacion,
  viajeController.obtenerTodos
);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esPasajero,
  viajeController.crearViaje
);

router.get(
  "/me/mis-viajes",
  authMiddleware.verificarToken,
  viajeController.obtenerMisViajes
);

router.get("/:id", authMiddleware.verificarToken, viajeController.obtenerPorId);

router.patch(
  "/:id/aceptar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  viajeController.aceptarViaje
);

router.patch(
  "/:id/iniciar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductorOAdmin,
  viajeController.iniciarViaje
);

router.patch(
  "/:id/finalizar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductorOAdmin,
  viajeController.finalizarViaje
);

router.patch(
  "/:id/cancelar",
  authMiddleware.verificarToken,
  roleMiddleware.esPasajeroOConductorOAdmin,
  viajeController.cancelarViaje
);

module.exports = router;
