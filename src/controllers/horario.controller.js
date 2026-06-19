const { Horario, Vehiculo, Ruta } = require("../models");

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
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const horario = await Horario.create(req.body);
    res.status(201).json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    await horario.update(req.body);
    res.json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    await horario.destroy();
    res.json({ message: "Horario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
