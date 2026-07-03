const express = require("express");
const router = express.Router();
const viajeController = require("../controllers/viaje.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
  establecerPaginacionPorDefecto,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/viajes:
 *   get:
 *     summary: Obtiene todos los viajes con paginación (solo admin)
 *     tags: [Viajes]
 *     parameters:
 *       - in: query
 *         name: paginaActual
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: registrosPorPagina
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Lista de viajes con paginación
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol administrador
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  establecerPaginacionPorDefecto,
  validarPaginacion,
  viajeController.obtenerTodos
);

/**
 * @swagger
 * /api/viajes:
 *   post:
 *     summary: Crea un nuevo viaje (solo pasajero)
 *     tags: [Viajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barrioOrigenId:
 *                 type: integer
 *               barrioDestinoId:
 *                 type: integer
 *               precioEstimado:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Viaje solicitado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol pasajero
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esPasajero,
  viajeController.crearViaje
);

/**
 * @swagger
 * /api/viajes/{id}:
 *   get:
 *     summary: Obtiene un viaje por ID
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje encontrado
 *       '401':
 *         description: Token inválido o faltante
 *       '404':
 *         description: Viaje no encontrado
 */
/**
 * @swagger
 * /api/viajes/me/mis-viajes:
 *   get:
 *     summary: Obtiene los viajes del usuario autenticado
 *     tags: [Viajes]
 *     responses:
 *       '200':
 *         description: Lista de viajes del usuario
 *       '401':
 *         description: Token inválido o faltante
 */
router.get(
  "/me/mis-viajes",
  authMiddleware.verificarToken,
  viajeController.obtenerMisViajes
);

router.get("/:id", authMiddleware.verificarToken, viajeController.obtenerPorId);

/**
 * @swagger
 * /api/viajes/{id}/aceptar:
 *   patch:
 *     summary: Acepta un viaje (solo conductor)
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje aceptado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol conductor
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
 *     summary: Inicia un viaje (solo conductor/admin)
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje iniciado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol conductor o administrador
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
 *     summary: Finaliza un viaje (solo conductor/admin)
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje finalizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol conductor o administrador
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
 *     summary: Cancela un viaje (solo pasajero/conductor/admin)
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje cancelado
 *       '400':
 *         descripcion: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol pasajero, conductor o administrador
 */
router.patch(
  "/:id/cancelar",
  authMiddleware.verificarToken,
  roleMiddleware.esPasajeroOConductorOAdmin,
  viajeController.cancelarViaje
);

module.exports = router;
