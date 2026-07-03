const express = require("express");
const router = express.Router();
const perfilPasajeroController = require("../controllers/perfilpasajero.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
  establecerPaginacionPorDefecto,
} = require("../middlewares/paginacion.validator");

router.get("/", establecerPaginacionPorDefecto, validarPaginacion, perfilPasajeroController.obtenerTodos);

router.get("/me/perfil", authMiddleware.verificarToken, roleMiddleware.esPasajero, perfilPasajeroController.obtenerMiPerfil);
router.put("/me/perfil", authMiddleware.verificarToken, roleMiddleware.esPasajero, perfilPasajeroController.actualizarMiPerfil);

router.get("/usuario/:usuarioId", perfilPasajeroController.obtenerPorUsuarioId);
router.get("/:id", perfilPasajeroController.obtenerPorId);

router.post("/", authMiddleware.verificarToken, roleMiddleware.esAdministrador, perfilPasajeroController.crearPerfil);
router.put("/:id", authMiddleware.verificarToken, roleMiddleware.esAdministrador, perfilPasajeroController.actualizarPerfil);
router.delete("/:id", authMiddleware.verificarToken, roleMiddleware.esAdministrador, perfilPasajeroController.eliminarPerfil);

module.exports = router;
