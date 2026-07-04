const express = require("express");
const router = express.Router();
const perfilEntidadController = require("../controllers/perfilentidad.controller");
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
  perfilEntidadController.obtenerTodos
);

router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esEntidad,
  perfilEntidadController.obtenerMiEntidad,
);

router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esEntidad,
  perfilEntidadController.actualizarMiEntidad,
);

router.get(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilEntidadController.obtenerPorId,
);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilEntidadController.crearEntidad,
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilEntidadController.actualizarEntidad,
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilEntidadController.eliminarEntidad,
);

module.exports = router;
