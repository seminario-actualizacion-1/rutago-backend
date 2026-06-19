const express = require("express");
const router = express.Router();
const perfilConductorController = require("../controllers/perfilconductor.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /api/perfiles-conductor:
 *   get:
 *     summary: Obtiene todos los perfiles de conductor (público)
 *     tags: [Perfiles Conductor]
 *     responses:
 *       '200':
 *         description: Lista de perfiles de conductor
 */
router.get("/", perfilConductorController.obtenerTodos);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   get:
 *     summary: Obtiene un perfil de conductor por ID (público)
 *     tags: [Perfiles Conductor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Perfil encontrado
 *       '404':
 *         description: Perfil no encontrado
 */
router.get("/:id", perfilConductorController.obtenerPorId);

/**
 * @swagger
 * /api/perfiles-conductor/me/perfil:
 *   get:
 *     summary: Obtiene el perfil del conductor autenticado
 *     tags: [Perfiles Conductor]
 *     responses:
 *       '200':
 *         description: Perfil del conductor
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol conductor
 *       '404':
 *         description: No tiene perfil de conductor
 */
router.get("/me/perfil", authMiddleware.verificarToken, roleMiddleware.esConductor, perfilConductorController.obtenerMiPerfil);

/**
 * @swagger
 * /api/perfiles-conductor:
 *   post:
 *     summary: Crea un perfil de conductor (solo admin)
 *     tags: [Perfiles Conductor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               vehiculoId:
 *                 type: integer
 *               licenciaConducir:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Perfil creado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.post(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilConductorController.crearPerfil
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   put:
 *     summary: Actualiza un perfil de conductor (solo admin)
 *     tags: [Perfiles Conductor]
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
 *               licenciaConducir:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil actualizado
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
  perfilConductorController.actualizarPerfil
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}/estado:
 *   patch:
 *     summary: Cambia el estado del conductor (solo conductor)
 *     tags: [Perfiles Conductor]
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
 *               estado:
 *                 type: string
 *                 enum: [DISPONIBLE, EN_VIAJE, INACTIVO]
 *     responses:
 *       '200':
 *         description: Estado actualizado
 *       '400':
 *         description: Error en la solicitud
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol conductor
 */
router.patch(
  "/:id/estado",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.cambiarEstado
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   delete:
 *     summary: Elimina un perfil de conductor (solo admin)
 *     tags: [Perfiles Conductor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Perfil eliminado
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
  perfilConductorController.eliminarPerfil
);

module.exports = router;
