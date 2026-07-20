const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/ruta.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");
const {
  validarCrearRuta,
  validarActualizarRuta,
} = require("../middlewares/ruta.validator");

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtener todas las rutas (paginado)
 *     tags: [Rutas]
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
 *         description: Lista de rutas
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  rutaController.obtenerTodas
);

/**
 * @swagger
 * /api/rutas/destino/{destino}:
 *   get:
 *     summary: Buscar rutas por destino
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del destino
 *     responses:
 *       200:
 *         description: Rutas encontradas
 *       401:
 *         description: No autenticado
 *       404:
 *         description: No se encontraron rutas
 */
router.get("/destino/:destino", authMiddleware.verificarToken, rutaController.buscarPorDestino);

/**
 * @swagger
 * /api/rutas/{id}:
 *   get:
 *     summary: Obtener una ruta por ID
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Datos de la ruta
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Ruta no encontrada
 */
router.get("/:id", authMiddleware.verificarToken, rutaController.obtenerPorId);

/**
 * @swagger
 * /api/rutas:
 *   post:
 *     summary: Crear una nueva ruta
 *     tags: [Rutas]
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
 *               - origenId
 *               - destinoId
 *               - distanciaKm
 *               - tiempoEstimadoMinutos
 *             properties:
 *               nombre:
 *                 type: string
 *               origenId:
 *                 type: integer
 *               destinoId:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               distanciaKm:
 *                 type: number
 *                 format: float
 *               tiempoEstimadoMinutos:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ruta creada exitosamente
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
  validarCrearRuta,
  rutaController.crearRuta
);

/**
 * @swagger
 * /api/rutas/{id}:
 *   put:
 *     summary: Actualizar una ruta por ID
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               origenId:
 *                 type: integer
 *               destinoId:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               distanciaKm:
 *                 type: number
 *                 format: float
 *               tiempoEstimadoMinutos:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Ruta no encontrada
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarActualizarRuta,
  rutaController.actualizarRuta
);

/**
 * @swagger
 * /api/rutas/{id}:
 *   delete:
 *     summary: Eliminar una ruta por ID
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Ruta eliminada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Ruta no encontrada
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rutaController.eliminarRuta
);

module.exports = router;
