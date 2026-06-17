const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

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
 *     responses:
 *       '201':
 *         description: Usuario registrado con éxito
 *       '400':
 *         description: Error en la solicitud
 */
router.post("/registro", usuarioController.registrarUsuario);

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
router.post("/login", usuarioController.login);

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
 *         description: Solicitud enviada correctamente
 *       '400':
 *         description: Error en la solicitud
 */
router.post("/recuperar-contrasena", usuarioController.recuperarContrasena);

/**
 * @swagger
 * /api/usuarios/cambiar-contrasena:
 *   post:
 *     summary: Cambiar contraseña
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
 *         description: Error en la solicitud
 */
router.post("/cambiar-contrasena", usuarioController.cambiarContrasena);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: Lista de usuarios
 */
router.get("/", authMiddleware.verificarToken, roleMiddleware.esAdministrador, usuarioController.obtenerTodos);

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
 */
router.get("/:id", authMiddleware.verificarToken, roleMiddleware.esAdministrador, usuarioController.obtenerPorId);

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
 *         description: No autorizado
 */
router.get("/me/perfil", authMiddleware.verificarToken, usuarioController.obtenerMiPerfil);

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
 */
router.put("/:id", authMiddleware.verificarToken, roleMiddleware.esAdministrador, usuarioController.actualizarUsuario);

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
 */
router.put("/:id/rol", authMiddleware.verificarToken, roleMiddleware.esAdministrador, usuarioController.cambiarRol);

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
 */
router.delete("/:id", authMiddleware.verificarToken, roleMiddleware.esAdministrador, usuarioController.eliminarUsuario);

module.exports = router;
