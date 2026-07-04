const express = require("express");
const router = express.Router();
const comunaController = require("../controllers/comuna.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  comunaController.obtenerTodas
);

router.get("/:id", authMiddleware.verificarToken, comunaController.obtenerPorId);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.crearComuna
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.actualizarComuna
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.eliminarComuna
);

module.exports = router;
