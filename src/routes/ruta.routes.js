const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/ruta.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtiene todas las rutas
 *     tags: [Rutas]
 *     responses:
 *       '200':
 *         description: Lista de rutas
 */
router.get("/", rutaController.obtenerTodas);

/**
 * @swagger
 * /api/rutas/destino/{destino}:
 *   get:
 *     summary: Busca rutas por destino
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de rutas hacia el destino
 */
router.get("/destino/:destino", rutaController.buscarPorDestino);

/**
 * @swagger
 * /api/rutas/{id}:
 *   get:
 *     summary: Obtiene una ruta por ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ruta encontrada
 *       '404':
 *         description: Ruta no encontrada
 */
router.get("/:id", rutaController.obtenerPorId);

/**
 * @swagger
 * /api/rutas:
 *   post:
 *     summary: Crea una nueva ruta (solo admin)
 *     tags: [Rutas]
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
 *               tiempoEstimadoMinutos:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Ruta creada
 *       '400':
 *         description: Error en la solicitud
 *       '403':
 *         description: Requiere rol admin
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  rutaController.crearRuta
);

/**
 * @swagger
 * /api/rutas/{id}:
 *   put:
 *     summary: Actualiza una ruta (solo admin)
 *     tags: [Rutas]
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
 *               origenId:
 *                 type: integer
 *               destinoId:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               distanciaKm:
 *                 type: number
 *               tiempoEstimadoMinutos:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Ruta actualizada
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
  rutaController.actualizarRuta
);

/**
 * @swagger
 * /api/rutas/{id}:
 *   delete:
 *     summary: Elimina una ruta (solo admin)
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ruta eliminada
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
  rutaController.eliminarRuta
);

module.exports = router;
