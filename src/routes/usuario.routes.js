const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarRegistro,
  validarLogin,
  validarRecuperarContrasena,
  validarCambiarContrasena,
  validarActualizarPerfil,
} = require("../middlewares/usuario.validator");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

router.post("/login", validarLogin, usuarioController.login);

router.post("/registro", validarRegistro, usuarioController.registrarUsuario);

router.post(
  "/recuperar-contrasena",
  validarRecuperarContrasena,
  usuarioController.recuperarContrasena
);

router.post(
  "/cambiar-contrasena",
  validarCambiarContrasena,
  usuarioController.cambiarContrasena
);

router.get(
  "/verificar-token",
  authMiddleware.verificarToken,
  usuarioController.verificarToken
);

router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  usuarioController.obtenerMiPerfil
);

router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  validarActualizarPerfil,
  usuarioController.actualizarMiPerfil
);

router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarPaginacion,
  usuarioController.obtenerTodos
);

router.get(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.obtenerPorId,
);

router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.actualizarUsuario,
);

router.put(
  "/:id/rol",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.cambiarRol,
);

router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.eliminarUsuario,
);

module.exports = router;
