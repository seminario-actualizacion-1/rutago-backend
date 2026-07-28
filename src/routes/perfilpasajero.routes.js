const express = require("express");
const router = express.Router();
const perfilPasajeroController = require("../controllers/perfilpasajero.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { validarSchema } = require("../middlewares/validator.middleware");
const perfilPasajeroSchema = require("../schemas/perfilpasajero.schema");

/**
 * @swagger
 * /api/perfiles-pasajero:
 *   get:
 *     summary: Obtener todos los perfiles de pasajero (paginado)
 *     tags: [Perfiles Pasajero]
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
 *         description: Lista de perfiles de pasajero
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
  perfilPasajeroController.obtenerTodos,
);

/**
 * @swagger
 * /api/perfiles-pasajero/me/perfil:
 *   get:
 *     summary: Obtener mi perfil de pasajero
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil de pasajero
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
  roleMiddleware.esPasajero,
  perfilPasajeroController.obtenerMiPerfil,
);

/**
 * @swagger
 * /api/perfiles-pasajero/me/perfil:
 *   put:
 *     summary: Actualizar mi perfil de pasajero
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: string
 *               direccion:
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
  roleMiddleware.esPasajero,
  validarSchema(perfilPasajeroSchema.actualizar),
  perfilPasajeroController.actualizarMiPerfil,
);

/**
 * @swagger
 * /api/perfiles-pasajero/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener perfil de pasajero por ID de usuario
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del perfil de pasajero
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Perfil no encontrado
 */
router.get(
  "/usuario/:usuarioId",
  authMiddleware.verificarToken,
  perfilPasajeroController.obtenerPorUsuarioId,
);

/**
 * @swagger
 * /api/perfiles-pasajero/{id}:
 *   get:
 *     summary: Obtener un perfil de pasajero por ID
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de pasajero
 *     responses:
 *       200:
 *         description: Datos del perfil de pasajero
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
  perfilPasajeroController.obtenerPorId,
);

/**
 * @swagger
 * /api/perfiles-pasajero:
 *   post:
 *     summary: Crear un nuevo perfil de pasajero
 *     tags: [Perfiles Pasajero]
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
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Perfil de pasajero creado exitosamente
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
  validarSchema(perfilPasajeroSchema.crear),
  perfilPasajeroController.crearPerfil,
);

/**
 * @swagger
 * /api/perfiles-pasajero/{id}:
 *   put:
 *     summary: Actualizar un perfil de pasajero por ID
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de pasajero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               telefono:
 *                 type: string
 *               direccion:
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
  validarSchema(perfilPasajeroSchema.actualizar),
  perfilPasajeroController.actualizarPerfil,
);

/**
 * @swagger
 * /api/perfiles-pasajero/{id}:
 *   delete:
 *     summary: Eliminar un perfil de pasajero por ID
 *     tags: [Perfiles Pasajero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil de pasajero
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
  perfilPasajeroController.eliminarPerfil,
);

/**
 * @swagger
 * /api/perfiles-pasajero/crear-usuario:
 *   post:
 *     summary: Crear usuario pasajero + perfil simultáneamente (admin)
 *     tags: [Perfiles Pasajero]
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
 *                   telefono:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   tipoDocumentoId:
 *                     type: integer
 *                   numeroDocumento:
 *                     type: string
 *                   fechaNacimiento:
 *                     type: string
 *                     format: date
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
  validarSchema(perfilPasajeroSchema.crearConUsuario),
  perfilPasajeroController.crearConUsuario,
);

module.exports = router;
