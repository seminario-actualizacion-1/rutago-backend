const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles (requiere token)
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Lista de roles del sistema
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  rolController.obtenerTodos
);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por ID (requiere token)
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Rol encontrado
 *       '404':
 *         description: Rol no encontrado
 *       '401':
 *         description: Token inválido o faltante
 */
router.get(
  "/:id",
  authMiddleware.verificarToken,
  rolController.obtenerPorId
);

module.exports = router;
