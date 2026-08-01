const express = require("express");
const router = express.Router();
const entidadController = require("../controllers/entidad.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { validarSchema } = require("../middlewares/validator.middleware");
const entidadSchema = require("../schemas/entidad.schema");

/**
 * @swagger
 * /api/entidades:
 *   get:
 *     summary: Obtener todos los entidades (paginado)
 *     tags: [Entidades]
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
 *         description: Lista de entidades
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
  entidadController.obtenerTodos,
);

/**
 * @swagger
 * /api/entidades/me/perfil:
 *   get:
 *     summary: Obtener mi entidad
 *     tags: [Entidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del entidad
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
  entidadController.obtenerMiEntidad,
);

/**
 * @swagger
 * /api/entidades/me/perfil:
 *   put:
 *     summary: Actualizar mi entidad
 *     tags: [Entidades]
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
  validarSchema(entidadSchema.actualizar),
  entidadController.actualizarMiEntidad,
);

/**
 * @swagger
 * /api/entidades/{id}:
 *   get:
 *     summary: Obtener un entidad por ID
 *     tags: [Entidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entidad
 *     responses:
 *       200:
 *         description: Datos del entidad
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
  entidadController.obtenerPorId,
);

/**
 * @swagger
 * /api/entidades:
 *   post:
 *     summary: Crear un nuevo entidad
 *     tags: [Entidades]
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
  validarSchema(entidadSchema.crear),
  entidadController.crearEntidad,
);

/**
 * @swagger
 * /api/entidades/{id}:
 *   put:
 *     summary: Actualizar un entidad por ID
 *     tags: [Entidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entidad
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
  validarSchema(entidadSchema.actualizar),
  entidadController.actualizarEntidad,
);

/**
 * @swagger
 * /api/entidades/{id}:
 *   delete:
 *     summary: Eliminar un entidad por ID
 *     tags: [Entidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entidad
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
  entidadController.eliminar,
);

/**
 * @swagger
 * /api/entidades/crear-usuario:
 *   post:
 *     summary: Crear usuario entidad + perfil simultáneamente (admin)
 *     tags: [Entidades]
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
  validarSchema(entidadSchema.crearConUsuario),
  entidadController.crearConUsuario,
);

module.exports = router;
