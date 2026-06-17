const express = require("express");
const router = express.Router();
const comunaController = require("../controllers/comuna.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/comunas:
 *   get:
 *     summary: Obtiene todas las comunas
 *     tags: [Comunas]
 *     responses:
 *       '200':
 *         description: Lista de comunas
 */
router.get("/", authMiddleware.verificarToken, comunaController.obtenerTodas);

/**
 * @swagger
 * /api/comunas/{id}:
 *   get:
 *     summary: Obtiene una comuna por ID
 *     tags: [Comunas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Comuna encontrada
 *       '404':
 *         description: Comuna no encontrada
 */
router.get("/:id", authMiddleware.verificarToken, comunaController.obtenerPorId);

/**
 * @swagger
 * /api/comunas:
 *   post:
 *     summary: Crea una nueva comuna (solo admin)
 *     tags: [Comunas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comuna creada
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Requiere rol admin
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.crearComuna
);

/**
 * @swagger
 * /api/comunas/{id}:
 *   put:
 *     summary: Actualiza una comuna (solo admin)
 *     tags: [Comunas]
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
 *     responses:
 *       '200':
 *         description: Comuna actualizada
 *       '400':
 *         description: Error en la solicitud
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.actualizarComuna
);

/**
 * @swagger
 * /api/comunas/{id}:
 *   delete:
 *     summary: Elimina una comuna (solo admin)
 *     tags: [Comunas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Comuna eliminada
 *       '400':
 *         description: Error en la solicitud
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.eliminarComuna
);

module.exports = router;
