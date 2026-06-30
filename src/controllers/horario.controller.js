const { Horario, Vehiculo, Ruta } = require("../models");

const validarHorarioPayload = async ({ vehiculoId, rutaId, horaSalida }) => {
  if (!vehiculoId || !rutaId || !horaSalida) {
    throw new Error("VEHICULO_RUTA_Y_HORA_SON_OBLIGATORIOS");
  }

  const vehiculo = await Vehiculo.findByPk(vehiculoId);
  if (!vehiculo) {
    throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  const ruta = await Ruta.findByPk(rutaId);
  if (!ruta) {
    throw new Error("RUTA_NO_ENCONTRADA");
  }
};

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
const obtenerTodos = async (req, res) => {
  try {
    const horarios = await Horario.findAll({
      include: [
        { model: Vehiculo, as: "vehiculo" },
        { model: Ruta, as: "ruta" },
      ],
    });
    res.json({ success: true, data: horarios });
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
const obtenerPorId = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id, {
      include: [
        { model: Vehiculo, as: "vehiculo" },
        { model: Ruta, as: "ruta" },
      ],
    });
    if (!horario) {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.json({ success: true, data: horario });
  } catch (error) {
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
const obtenerPorRuta = async (req, res) => {
  try {
    const horarios = await Horario.findAll({
      where: { rutaId: req.params.rutaId },
      include: [
        { model: Vehiculo, as: "vehiculo" },
        { model: Ruta, as: "ruta" },
      ],
    });
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
const obtenerPorVehiculo = async (req, res) => {
  try {
    const horarios = await Horario.findAll({
      where: { vehiculoId: req.params.vehiculoId },
      include: [
        { model: Vehiculo, as: "vehiculo" },
        { model: Ruta, as: "ruta" },
      ],
    });
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
const crearHorario = async (req, res) => {
  try {
    await validarHorarioPayload(req.body);
    const horario = await Horario.create(req.body);
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
const actualizarHorario = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (!horario) {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    await validarHorarioPayload(req.body);
    await horario.update(req.body);
    res.json({ success: true, message: "Horario actualizado", data: horario });
  } catch (error) {
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
const eliminarHorario = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (!horario) {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    await horario.destroy();
    res.json({ success: true, message: "Horario eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorRuta,
  obtenerPorVehiculo,
  crearHorario,
  actualizarHorario,
  eliminarHorario,
};
