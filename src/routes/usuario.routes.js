const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

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

module.exports = router;
