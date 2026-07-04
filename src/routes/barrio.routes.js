const express = require("express");
const router = express.Router();
const barrioController = require("../controllers/barrio.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  barrioController.obtenerTodos
);

router.get("/comuna/:comunaId", authMiddleware.verificarToken, barrioController.obtenerPorComuna);

router.get("/:id", authMiddleware.verificarToken, barrioController.obtenerPorId);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.crearBarrio
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.actualizarBarrio
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.eliminarBarrio
);

module.exports = router;
