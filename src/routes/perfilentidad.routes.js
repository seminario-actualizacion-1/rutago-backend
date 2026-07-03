const express = require("express");
const router = express.Router();
const perfilEntidadController = require("../controllers/perfilentidad.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  validarPaginacion,
  establecerPaginacionPorDefecto,
} = require("../middlewares/paginacion.validator");

/**
 * @swagger
 * /api/perfiles-entidad:
 *   get:
 *     summary: Obtiene todos los perfiles de entidad (solo admin)
 *     tags: [Perfiles Entidad]
 *     responses:
 *       '200':
 *         description: Lista de perfiles de entidad
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
router.get(
  "/",
  authMiddleware.verificarToken,
  roleMiddleware.esAdministrador,
  establecerPaginacionPorDefecto,
  validarPaginacion,
  perfilEntidadController.obtenerTodos
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   get:
 *     summary: Obtiene un perfil de entidad por ID (solo admin)
 *     tags: [Perfiles Entidad]
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
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: No tiene rol administrador
 */
/**
 * @swagger
 * /api/perfiles-entidad/me/perfil:
 *   get:
 *     summary: Obtiene el perfil de la entidad autenticada
 *     tags: [Perfiles Entidad]
 *     responses:
 *       '200':
 *         description: Perfil de la entidad
 *       '401':
 *         description: Token inválido o faltante
 *       '403':
 *         description: Requiere rol entidad externa
 */
router.get(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esEntidad,
  perfilEntidadController.obtenerMiEntidad,
);

router.put(
  "/me/perfil",
  authMiddleware.verificarToken,
  roleMiddleware.esEntidad,
  perfilEntidadController.actualizarMiEntidad,
);

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
 *     summary: Crea un perfil de entidad (solo admin)
 *     tags: [Perfiles Entidad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               razonSocial:
 *                 type: string
 *               nit:
 *                 type: string
 *               telefonoContacto:
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
  perfilEntidadController.crearEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   put:
 *     summary: Actualiza un perfil de entidad (solo admin)
 *     tags: [Perfiles Entidad]
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
 *               razonSocial:
 *                 type: string
 *               nit:
 *                 type: string
 *               telefonoContacto:
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
  perfilEntidadController.actualizarEntidad,
);

/**
 * @swagger
 * /api/perfiles-entidad/{id}:
 *   delete:
 *     summary: Elimina un perfil de entidad (solo admin)
 *     tags: [Perfiles Entidad]
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
  perfilEntidadController.eliminarEntidad,
);

module.exports = router;
