const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Obtener todos los horarios (paginado)
 *     tags: [Horarios]
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
 *         description: Lista de horarios
 *       401:
 *         description: No autenticado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  horarioController.obtenerTodos
);

/**
 * @swagger
 * /api/horarios/ruta/{rutaId}:
 *   get:
 *     summary: Obtener horarios por ruta
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rutaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Horarios de la ruta
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Ruta no encontrada
 */
router.get("/ruta/:rutaId", authMiddleware.verificarToken, horarioController.obtenerPorRuta);

/**
 * @swagger
 * /api/horarios/vehiculo/{vehiculoId}:
 *   get:
 *     summary: Obtener horarios por vehículo
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehiculoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Horarios del vehículo
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Vehículo no encontrado
 */
router.get("/vehiculo/:vehiculoId", authMiddleware.verificarToken, horarioController.obtenerPorVehiculo);

/**
 * @swagger
 * /api/horarios/{id}:
 *   get:
 *     summary: Obtener un horario por ID
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Datos del horario
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Horario no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, horarioController.obtenerPorId);

/**
 * @swagger
 * /api/horarios:
 *   post:
 *     summary: Crear un nuevo horario
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rutaId
 *               - vehiculoId
 *               - horaSalida
 *               - frecuenciaMinutos
 *             properties:
 *               rutaId:
 *                 type: integer
 *               vehiculoId:
 *                 type: integer
 *               horaSalida:
 *                 type: string
 *                 format: time
 *               frecuenciaMinutos:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Horario creado exitosamente
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
  horarioController.crearHorario
);

/**
 * @swagger
 * /api/horarios/{id}:
 *   put:
 *     summary: Actualizar un horario por ID
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rutaId:
 *                 type: integer
 *               vehiculoId:
 *                 type: integer
 *               horaSalida:
 *                 type: string
 *                 format: time
 *               frecuenciaMinutos:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Horario no encontrado
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
 *     summary: Eliminar un horario por ID
 *     tags: [Horarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Horario no encontrado
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  horarioController.eliminarHorario
);

module.exports = router;
