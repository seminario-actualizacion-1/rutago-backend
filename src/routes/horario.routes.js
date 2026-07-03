const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
  establecerPaginacionPorDefecto,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Obtiene todos los horarios
 *     tags: [Horarios]
 *     responses:
 *       '200':
 *         description: Lista de horarios
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  establecerPaginacionPorDefecto,
  validarPaginacion,
  horarioController.obtenerTodos
);

/**
 * @swagger
 * /api/horarios/ruta/{rutaId}:
 *   get:
 *     summary: Obtiene horarios por ruta
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: rutaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de horarios de la ruta
 */
router.get("/ruta/:rutaId", authMiddleware.verificarToken, horarioController.obtenerPorRuta);

/**
 * @swagger
 * /api/horarios/vehiculo/{vehiculoId}:
 *   get:
 *     summary: Obtiene horarios por vehículo
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: vehiculoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de horarios del vehículo
 */
router.get("/vehiculo/:vehiculoId", authMiddleware.verificarToken, horarioController.obtenerPorVehiculo);

/**
 * @swagger
 * /api/horarios/{id}:
 *   get:
 *     summary: Obtiene un horario por ID
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Horario encontrado
 *       '404':
 *         description: Horario no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, horarioController.obtenerPorId);

/**
 * @swagger
 * /api/horarios:
 *   post:
 *     summary: Crea un nuevo horario (solo admin)
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculoId:
 *                 type: integer
 *               rutaId:
 *                 type: integer
 *               horaSalida:
 *                 type: string
 *                 format: time
 *               frecuenciaMinutos:
 *                 type: integer
 *               diasSemana:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Horario creado
 *       '400':
 *         description: Error en la solicitud
 *       '403':
 *         description: Requiere rol admin
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.crearHorario
);

/**
 * @swagger
 * /api/horarios/{id}:
 *   put:
 *     summary: Actualiza un horario (solo admin)
 *     tags: [Horarios]
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
 *               vehiculoId:
 *                 type: integer
 *               rutaId:
 *                 type: integer
 *               horaSalida:
 *                 type: string
 *                 format: time
 *               frecuenciaMinutos:
 *                 type: integer
 *               diasSemana:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Horario actualizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.actualizarHorario
);

/**
 * @swagger
 * /api/horarios/{id}:
 *   delete:
 *     summary: Elimina un horario (solo admin)
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Horario eliminado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.eliminarHorario
);

module.exports = router;
