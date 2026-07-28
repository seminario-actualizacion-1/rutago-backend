const express = require("express");
const router = express.Router();
const perfilEntidadController = require("../controllers/perfilentidad.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { validarSchema } = require("../middlewares/validator.middleware");
const perfilEntidadSchema = require("../schemas/perfilentidad.schema");

/**
 * @swagger
 * /api/perfiles-entidad:
 *   get:
 *     summary: Obtener todos los perfiles de entidad (paginado)
 *     tags: [Perfiles Entidad]
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
 *         description: Lista de perfiles de entidad
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarSchema(require("../schemas/paginacion.schema").paginacion, "query"),
  perfilEntidadController.obtenerTodos,
);

/**
 * @swagger
 * /api/perfiles-entidad/me/perfil:
 *   get:
 *     summary: Obtener mi perfil de entidad
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil de entidad
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
  roleMiddleware.esEntidad,
  perfilEntidadController.obtenerMiEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/me/perfil:
 *   put:
 *     summary: Actualizar mi perfil de entidad
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
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
  roleMiddleware.esEntidad,
  validarSchema(perfilEntidadSchema.actualizar),
  perfilEntidadController.actualizarMiEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   get:
 *     summary: Obtener un perfil de entidad por ID
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de entidad
 *     responses:
 *       200:
 *         description: Datos del perfil de entidad
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */
router.get(
  "/:id",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  perfilEntidadController.obtenerPorId,
);

/**
 * @swagger
 * /api/perfiles-entidad:
 *   post:
 *     summary: Crear un nuevo perfil de entidad
 *     tags: [Perfiles Entidad]
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
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Perfil de entidad creado exitosamente
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
  validarSchema(perfilEntidadSchema.crear),
  perfilEntidadController.crearEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   put:
 *     summary: Actualizar un perfil de entidad por ID
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de entidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
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
  validarSchema(perfilEntidadSchema.actualizar),
  perfilEntidadController.actualizarEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   delete:
 *     summary: Eliminar un perfil de entidad por ID
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de entidad
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
  perfilEntidadController.eliminarEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/crear-usuario:
 *   post:
 *     summary: Crear usuario entidad + perfil simultáneamente (admin)
 *     tags: [Perfiles Entidad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               datosUsuario:
 *                 type: object
 *                 properties:
 *                   nombres:
 *                     type: string
 *                   apellidos:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   contrasena:
 *                     type: string
 *               datosPerfil:
 *                 type: object
 *                 properties:
 *                   razonSocial:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   telefono:
 *                     type: string
 *     responses:
 *       201:
 *         description: Usuario y perfil creados exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.post(
  "/crear-usuario",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  validarSchema(perfilEntidadSchema.crearConUsuario),
  perfilEntidadController.crearConUsuario,
);

module.exports = router;
