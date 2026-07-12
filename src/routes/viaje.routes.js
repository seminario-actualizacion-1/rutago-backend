const express = require("express");
const router = express.Router();
const viajeController = require("../controllers/viaje.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/viajes:
 *   get:
 *     summary: Obtener todos los viajes (paginado)
 *     tags: [Viajes]
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
 *         description: Lista de viajes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarPaginacion,
  viajeController.obtenerTodos
);

/**
 * @swagger
 * /api/viajes:
 *   post:
 *     summary: Crear un nuevo viaje
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - barrioOrigenId
 *               - barrioDestinoId
 *             properties:
 *               barrioOrigenId:
 *                 type: integer
 *               barrioDestinoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Viaje creado exitosamente
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
  roleMiddleware.esPasajero,
  viajeController.crearViaje
);

/**
 * @swagger
 * /api/viajes/me/mis-viajes:
 *   get:
 *     summary: Obtener los viajes del usuario autenticado
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de viajes del usuario
 *       401:
 *         description: No autenticado
 */
router.get(
  "/me/mis-viajes",
  authMiddleware.verificarToken,
  viajeController.obtenerMisViajes
);

/**
 * @swagger
 * /api/viajes/{id}:
 *   get:
 *     summary: Obtener un viaje por ID
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Datos del viaje
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Viaje no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, viajeController.obtenerPorId);

/**
 * @swagger
 * /api/viajes/{id}/aceptar:
 *   patch:
 *     summary: Aceptar un viaje (conductor)
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Viaje aceptado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Viaje no encontrado
 */
router.patch(
  "/:id/aceptar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  viajeController.aceptarViaje
);

/**
 * @swagger
 * /api/viajes/{id}/iniciar:
 *   patch:
 *     summary: Iniciar un viaje (conductor o admin)
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Viaje iniciado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Viaje no encontrado
 */
router.patch(
  "/:id/iniciar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductorOAdmin,
  viajeController.iniciarViaje
);

/**
 * @swagger
 * /api/viajes/{id}/finalizar:
 *   patch:
 *     summary: Finalizar un viaje (conductor o admin)
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Viaje finalizado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Viaje no encontrado
 */
router.patch(
  "/:id/finalizar",
  authMiddleware.verificarToken,
  roleMiddleware.esConductorOAdmin,
  viajeController.finalizarViaje
);

/**
 * @swagger
 * /api/viajes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar un viaje (pasajero, conductor o admin)
 *     tags: [Viajes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Viaje cancelado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Viaje no encontrado
 */
router.patch(
  "/:id/cancelar",
  authMiddleware.verificarToken,
  roleMiddleware.esPasajeroOConductorOAdmin,
  viajeController.cancelarViaje
);

module.exports = router;
