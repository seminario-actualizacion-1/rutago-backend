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
  establecerPaginacionPorDefecto,
} = require("../middlewares/paginacion.validator");
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales inválidas
 */
router.post("/login", validarLogin, usuarioController.login);
/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     summary: Registra un nuevo usuario en RutaGo
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rolId:
 *                 type: integer
 *                 description: ID del rol (opcional, por defecto 3 - Pasajero)
 *     responses:
 *       '201':
 *         descripción: Usuario registrado con éxito
 *       '400':
 *         description: Error en la solicitud o correo ya existe
 */
router.post("/registro", validarRegistro, usuarioController.registrarUsuario);

/**
 * @swagger
 * /api/usuarios/recuperar-contrasena:
 *   post:
 *     summary: Recuperar contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Token generado para recuperación
 *       '400':
 *         description: Error en la solicitud
 */
router.post(
  "/recuperar-contrasena",
  validarRecuperarContrasena,
  usuarioController.recuperarContrasena
);

/**
 * @swagger
 * /api/usuarios/cambiar-contrasena:
 *   post:
 *     summary: Cambiar contraseña con token
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               nuevaContrasena:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contraseña actualizada correctamente
 *       '400':
 *         description: Token inválido o error en la solicitud
 */
router.post(
  "/cambiar-contrasena",
  validarCambiarContrasena,
  usuarioController.cambiarContrasena
);

/**
 * @swagger
 * /api/usuarios/verificar-token:
 *   get:
 *     summary: Verifica si el token del usuario es válido
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombres:
 *                       type: string
 *                     apellidos:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     rolId:
 *                       type: integer
 *                     rol:
 *                       type: string
 *       '401':
 *         description: Token inválido o expirado
 */
router.get(
  "/verificar-token",
  authMiddleware.verificarToken,
  usuarioController.verificarToken
);

/**
 * @swagger
 * /api/usuarios/me/perfil:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: Perfil del usuario
 *       '401':
 *         description: Token inválido o faltante
 */
router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  usuarioController.obtenerMiPerfil
);

/**
 * @swagger
 * /api/usuarios/me/perfil:
 *   put:
 *     summary: Actualiza el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil actualizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 */
router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  validarActualizarPerfil,
  usuarioController.actualizarMiPerfil
);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios (solo admin) con paginación
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: paginaActual
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página actual
 *       - in: query
 *         name: registrosPorPagina
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página
 *     responses:
 *       '200':
 *         description: Lista de usuarios con paginación
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  establecerPaginacionPorDefecto,
  validarPaginacion,
  usuarioController.obtenerTodos
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *       '400':
 *         description: Usuario no encontrado
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.get(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.obtenerPorId,
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza datos de un usuario (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario actualizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.actualizarUsuario,
);

/**
 * @swagger
 * /api/usuarios/{id}/rol:
 *   put:
 *     summary: Cambia el rol de un usuario (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Rol actualizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.put(
  "/:id/rol",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.cambiarRol,
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario eliminado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  usuarioController.eliminarUsuario,
);

module.exports = router;
