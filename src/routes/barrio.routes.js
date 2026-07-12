const express = require("express");
const router = express.Router();
const barrioController = require("../controllers/barrio.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/barrios:
 *   get:
 *     summary: Obtener todos los barrios (paginado)
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: paginaActual
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: registrosPorPagina
 *         schema:
 *           type: integer
 *         description: Registros por página
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo de ordenamiento
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Dirección del ordenamiento
 *     responses:
 *       200:
 *         description: Lista de barrios
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  barrioController.obtenerTodos
);

/**
 * @swagger
 * /api/barrios/comuna/{comunaId}:
 *   get:
 *     summary: Obtener barrios por comuna
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comunaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la comuna
 *     responses:
 *       200:
 *         description: Barrios de la comuna
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Comuna no encontrada
 */
router.get("/comuna/:comunaId", authMiddleware.verificarToken, barrioController.obtenerPorComuna);

/**
 * @swagger
 * /api/barrios/{id}:
 *   get:
 *     summary: Obtener un barrio por ID
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barrio
 *     responses:
 *       200:
 *         description: Datos del barrio
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Barrio no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, barrioController.obtenerPorId);

/**
 * @swagger
 * /api/barrios:
 *   post:
 *     summary: Crear un nuevo barrio
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - comunaId
 *             properties:
 *               nombre:
 *                 type: string
 *               comunaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Barrio creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
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
 *     summary: Actualizar un barrio por ID
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barrio
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
 *       200:
 *         description: Barrio actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Barrio no encontrado
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
 *     summary: Eliminar un barrio por ID
 *     tags: [Barrios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barrio
 *     responses:
 *       200:
 *         description: Barrio eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Barrio no encontrado
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  barrioController.eliminarBarrio
);

module.exports = router;
