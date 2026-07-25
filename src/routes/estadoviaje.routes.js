const express = require("express");
const router = express.Router();
const estadoViajeController = require("../controllers/estadoviaje.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/estados-viaje:
 *   get:
 *     summary: Obtener todos los estados de viaje
 *     tags: [Estados Viaje]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de viaje
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  estadoViajeController.obtenerTodos,
);

module.exports = router;
