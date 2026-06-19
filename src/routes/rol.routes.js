const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles (solo admin)
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Lista de roles del sistema
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rolController.obtenerTodos
);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por ID (solo admin)
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
 *       '403':
 *         description: No tiene rol administrador
 */
router.get(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rolController.obtenerPorId
);

module.exports = router;
