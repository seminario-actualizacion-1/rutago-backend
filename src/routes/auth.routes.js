const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validarSchema } = require("../middlewares/validator.middleware");
const authSchema = require("../schemas/auth.schema");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               contrasena:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", validarSchema(authSchema.login), authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refrescar token de acceso
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nuevo token generado
 *       401:
 *         description: Refresh token inválido
 */
router.post(
  "/refresh",
  validarSchema(authSchema.refresh),
  authController.refrescarToken,
);

/**
 * @swagger
 * /api/auth/verificar-token:
 *   get:
 *     summary: Verificar validez del token JWT
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido
 */
router.get(
  "/verificar-token",
  authMiddleware.verificarToken,
  authController.verificarToken,
);

module.exports = router;
