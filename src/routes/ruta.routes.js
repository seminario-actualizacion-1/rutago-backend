const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/ruta.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  rutaController.obtenerTodas
);

router.get("/destino/:destino", authMiddleware.verificarToken, rutaController.buscarPorDestino);

router.get("/:id", authMiddleware.verificarToken, rutaController.obtenerPorId);

router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rutaController.crearRuta
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rutaController.actualizarRuta
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rutaController.eliminarRuta
);

module.exports = router;
