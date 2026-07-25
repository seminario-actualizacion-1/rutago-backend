const express = require("express");
const router = express.Router();
const estadoVehiculoController = require("../controllers/estadovehiculo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/estados-vehiculo:
 *   get:
 *     summary: Obtener todos los estados de vehículo
 *     tags: [Estados Vehículo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de vehículo
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  estadoVehiculoController.obtenerTodos,
);

module.exports = router;
