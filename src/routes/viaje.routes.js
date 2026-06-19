const express = require("express");
const router = express.Router();
const viajeController = require("../controllers/viaje.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/viajes:
 *   get:
 *     summary: Obtiene todos los viajes (requiere token)
 *     tags: [Viajes]
 *     responses:
 *       '200':
 *         description: Lista de viajes
 *       '401':
 *         description: Token inválido o faltante
 */
router.use(authMiddleware.verificarToken);

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
router.post("/", roleMiddleware.esPasajero, viajeController.crearViaje);

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
router.get("/:id", viajeController.obtenerPorId);

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
router.get("/me/mis-viajes", viajeController.obtenerMisViajes);

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
router.patch("/:id/aceptar", roleMiddleware.esConductor, viajeController.aceptarViaje);

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
router.patch("/:id/iniciar", roleMiddleware.esConductorOAdmin, viajeController.iniciarViaje);

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
router.patch("/:id/finalizar", roleMiddleware.esConductorOAdmin, viajeController.finalizarViaje);

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
router.patch("/:id/cancelar", roleMiddleware.esPasajeroOConductorOAdmin, viajeController.cancelarViaje);

module.exports = router;
