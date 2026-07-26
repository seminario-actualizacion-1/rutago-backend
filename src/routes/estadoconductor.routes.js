const express = require("express");
const router = express.Router();
const estadoConductorController = require("../controllers/estadoconductor.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/estados-conductor:
 *   get:
 *     summary: Obtener todos los estados de conductor
 *     tags: [Estados Conductor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de conductor
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  estadoConductorController.obtenerTodos,
);

module.exports = router;
