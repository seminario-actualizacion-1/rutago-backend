const express = require("express");
const router = express.Router();
const perfilConductorController = require("../controllers/perfilconductor.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
} = require("../middlewares/paginacion.validator");
const {
  validarCrearPerfilConductor,
  validarActualizarPerfilConductor,
} = require("../middlewares/perfilconductor.validator");

/**
 * @swagger
 * /api/perfiles-conductor:
 *   get:
 *     summary: Obtener todos los perfiles de conductor (paginado)
 *     tags: [Perfiles Conductor]
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
 *         description: Lista de perfiles de conductor
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  validarPaginacion,
  perfilConductorController.obtenerTodos
);

/**
 * @swagger
 * /api/perfiles-conductor/me/perfil:
 *   get:
 *     summary: Obtener mi perfil de conductor
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil de conductor
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.obtenerMiPerfil,
);

/**
 * @swagger
 * /api/perfiles-conductor/me/perfil:
 *   put:
 *     summary: Actualizar mi perfil de conductor
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenciaConducir:
 *                 type: string
 *               estadoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  validarActualizarPerfilConductor,
  perfilConductorController.actualizarMiPerfil,
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   get:
 *     summary: Obtener un perfil de conductor por ID
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de conductor
 *     responses:
 *       200:
 *         description: Datos del perfil de conductor
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.get("/:id", authMiddleware.verificarToken, perfilConductorController.obtenerPorId);

/**
 * @swagger
 * /api/perfiles-conductor:
 *   post:
 *     summary: Crear un nuevo perfil de conductor
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               licenciaConducir:
 *                 type: string
 *               estadoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Perfil de conductor creado exitosamente
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
  validarCrearPerfilConductor,
  perfilConductorController.crearPerfil,
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   put:
 *     summary: Actualizar un perfil de conductor por ID
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de conductor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               licenciaConducir:
 *                 type: string
 *               estadoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.put(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarActualizarPerfilConductor,
  perfilConductorController.actualizarPerfil,
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de un perfil de conductor
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de conductor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estadoId
 *             properties:
 *               estadoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.patch(
  "/:id/estado",
  authMiddleware.verificarToken,
  roleMiddleware.esConductor,
  perfilConductorController.cambiarEstado,
);

/**
 * @swagger
 * /api/perfiles-conductor/{id}:
 *   delete:
 *     summary: Eliminar un perfil de conductor por ID
 *     tags: [Perfiles Conductor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de conductor
 *     responses:
 *       200:
 *         description: Perfil eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.delete(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilConductorController.eliminarPerfil,
);

module.exports = router;
