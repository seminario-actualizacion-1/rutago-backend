const express = require("express");
const router = express.Router();
const comunaController = require("../controllers/comuna.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");
const {
  validarCrearComuna,
  validarActualizarComuna,
} = require("../middlewares/comuna.validator");

/**
 * @swagger
 * /api/comunas:
 *   get:
 *     summary: Obtener todas las comunas (paginado)
 *     tags: [Comunas]
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
 *         description: Lista de comunas
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  comunaController.obtenerTodas
);

/**
 * @swagger
 * /api/comunas/{id}:
 *   get:
 *     summary: Obtener una comuna por ID
 *     tags: [Comunas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la comuna
 *     responses:
 *       200:
 *         description: Datos de la comuna
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Comuna no encontrada
 */
router.get("/:id", authMiddleware.verificarToken, comunaController.obtenerPorId);

/**
 * @swagger
 * /api/comunas:
 *   post:
 *     summary: Crear una nueva comuna
 *     tags: [Comunas]
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
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comuna creada exitosamente
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
  validarCrearComuna,
  comunaController.crearComuna
);

/**
 * @swagger
 * /api/comunas/{id}:
 *   put:
 *     summary: Actualizar una comuna por ID
 *     tags: [Comunas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la comuna
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
 *       200:
 *         description: Comuna actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Comuna no encontrada
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarActualizarComuna,
  comunaController.actualizarComuna
);

/**
 * @swagger
 * /api/comunas/{id}:
 *   delete:
 *     summary: Eliminar una comuna por ID
 *     tags: [Comunas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la comuna
 *     responses:
 *       200:
 *         description: Comuna eliminada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Comuna no encontrada
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  comunaController.eliminarComuna
);

module.exports = router;
