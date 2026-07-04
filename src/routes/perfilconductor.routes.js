const express = require("express");
const router = express.Router();
const perfilConductorController = require("../controllers/perfilconductor.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  perfilConductorController.obtenerTodos
);

router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.obtenerMiPerfil,
);

router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.actualizarMiPerfil,
);

router.get("/:id", authMiddleware.verificarToken, perfilConductorController.obtenerPorId);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilConductorController.crearPerfil,
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilConductorController.actualizarPerfil,
);

router.patch(
  "/:id/estado",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.cambiarEstado,
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilConductorController.eliminarPerfil,
);

module.exports = router;
