const express = require("express");
const router = express.Router();
const tipoDocumentoController = require("../controllers/tipodocumento.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/tipos-documento:
 *   get:
 *     summary: Obtener todos los tipos de documento
 *     tags: [Tipos Documento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de documento
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  tipoDocumentoController.obtenerTodos,
);

module.exports = router;
