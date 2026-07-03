const horarioService = require("../services/horario.service");

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
exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina } = req.query;
    const resultado = await horarioService.obtenerTodos(
      paginaActual,
      registrosPorPagina
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
exports.obtenerPorId = async (req, res) => {
  try {
    const horario = await horarioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: horario });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

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
exports.obtenerPorRuta = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorRuta(req.params.rutaId);
    res.json({ success: true, data: horarios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
exports.obtenerPorVehiculo = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorVehiculo(
      req.params.vehiculoId
    );
    res.json({ success: true, data: horarios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 */
exports.crearHorario = async (req, res) => {
  try {
    const horario = await horarioService.crearHorario(req.body);
    res
      .status(201)
      .json({ success: true, message: "Horario creado", data: horario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 */
exports.actualizarHorario = async (req, res) => {
  try {
    const horario = await horarioService.actualizarHorario(
      req.params.id,
      req.body
    );
    res.json({ success: true, message: "Horario actualizado", data: horario });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 *       '404':
 *         description: Horario no encontrado
 */
exports.eliminarHorario = async (req, res) => {
  try {
    await horarioService.eliminarHorario(req.params.id);
    res.json({ success: true, message: "Horario eliminado" });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
