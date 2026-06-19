const express = require("express");
const router = express.Router();
const vehiculoController = require("../controllers/vehiculo.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtiene todos los vehículos (público)
 *     tags: [Vehículos]
 *     responses:
 *       '200':
 *         description: Lista de vehículos con su entidad
 */
router.get("/", vehiculoController.obtenerTodos);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtiene un vehículo por ID (público)
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Vehículo encontrado
 *       '404':
 *         description: Vehículo no encontrado
 */
router.get("/:id", vehiculoController.obtenerPorId);

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Crea un nuevo vehículo (solo admin)
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               color:
 *                 type: string
 *               capacidadPasajeros:
 *                 type: integer
 *               entidadId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Vehículo creado
 *       '400':
 *         description: Error en la solicitud
 *       '403':
 *         description: Requiere rol admin
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  vehiculoController.crearVehiculo
);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualiza un vehículo (solo admin)
 *     tags: [Vehículos]
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
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               color:
 *                 type: string
 *               capacidadPasajeros:
 *                 type: integer
 *               entidadId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Vehículo actualizado
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
  vehiculoController.actualizarVehiculo
);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Elimina un vehículo (solo admin)
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Vehículo eliminado
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
  vehiculoController.eliminarVehiculo
);

module.exports = router;
