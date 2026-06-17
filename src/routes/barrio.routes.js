const express = require("express");
const router = express.Router();
const barrioController = require("../controllers/barrio.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/barrios:
 *   get:
 *     summary: Obtiene todos los barrios
 *     tags: [Barrios]
 *     responses:
 *       '200':
 *         description: Lista de barrios con su comuna
 */
router.get("/", authMiddleware.verificarToken, barrioController.obtenerTodos);

/**
 * @swagger
 * /api/barrios/comuna/{comunaId}:
 *   get:
 *     summary: Obtiene barrios por comuna
 *     tags: [Barrios]
 *     parameters:
 *       - in: path
 *         name: comunaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de barrios de la comuna
 *       '404':
 *         description: Comuna no encontrada
 */
router.get("/comuna/:comunaId", authMiddleware.verificarToken, barrioController.obtenerPorComuna);

/**
 * @swagger
 * /api/barrios/{id}:
 *   get:
 *     summary: Obtiene un barrio por ID
 *     tags: [Barrios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Barrio encontrado
 *       '404':
 *         description: Barrio no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, barrioController.obtenerPorId);

/**
 * @swagger
 * /api/barrios:
 *   post:
 *     summary: Crea un nuevo barrio (solo admin)
 *     tags: [Barrios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               comunaId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Barrio creado
 *       '400':
 *         description: Error en la solicitud
 *       '403':
 *         description: Requiere rol admin
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.crearBarrio
);

/**
 * @swagger
 * /api/barrios/{id}:
 *   put:
 *     summary: Actualiza un barrio (solo admin)
 *     tags: [Barrios]
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
 *               nombre:
 *                 type: string
 *               comunaId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Barrio actualizado
 *       '400':
 *         description: Error en la solicitud
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.actualizarBarrio
);

/**
 * @swagger
 * /api/barrios/{id}:
 *   delete:
 *     summary: Elimina un barrio (solo admin)
 *     tags: [Barrios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Barrio eliminado
 *       '400':
 *         description: Error en la solicitud
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.eliminarBarrio
);

module.exports = router;
