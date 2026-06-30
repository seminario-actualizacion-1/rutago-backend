const {
  Ruta,
  Comuna,
  Barrio,
  Horario,
  Vehiculo,
  PerfilEntidad,
} = require("../models");

const validarRutaPayload = async ({ nombre, origenId, destinoId }) => {
  if (!nombre || !origenId || !destinoId) {
    throw new Error("NOMBRE_ORIGEN_Y_DESTINO_SON_OBLIGATORIOS");
  }

  if (Number(origenId) === Number(destinoId)) {
    throw new Error("ORIGEN_Y_DESTINO_NO_PUEDEN_SER_IGUALES");
  }

  const origen = await Comuna.findByPk(origenId);
  if (!origen) {
    throw new Error("COMUNA_ORIGEN_NO_ENCONTRADA");
  }

  const destino = await Comuna.findByPk(destinoId);
  if (!destino) {
    throw new Error("COMUNA_DESTINO_NO_ENCONTRADA");
  }
};
const { Op } = require("sequelize");

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
const obtenerTodas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll({
      include: [
        { model: Comuna, as: "origen" },
        { model: Comuna, as: "destino" },
      ],
    });
    res.json({ success: true, data: rutas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
const obtenerPorId = async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id, {
      include: [
        { model: Comuna, as: "origen" },
        { model: Comuna, as: "destino" },
        { model: Barrio, as: "barrios" },
        {
          model: Horario,
          as: "horarios",
          include: [{ model: Vehiculo, as: "vehiculo" }],
        },
      ],
    });
    if (!ruta) {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    res.json({ success: true, data: ruta });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/rutas/destino/{destino}:
 *   get:
 *     summary: Busca rutas por destino con buses y horarios
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de rutas hacia el destino con buses y horarios
 */
const buscarPorDestino = async (req, res) => {
  try {
    const { destino } = req.params;

    const rutas = await Ruta.findAll({
      include: [
        { model: Comuna, as: "origen" },
        { model: Comuna, as: "destino" },
        {
          model: Horario,
          as: "horarios",
          include: [
            {
              model: Vehiculo,
              as: "vehiculo",
              include: [
                {
                  model: PerfilEntidad,
                  as: "perfilEntidad",
                },
              ],
            },
          ],
        },
      ],
      where: {
        "$destino.nombre$": {
          [Op.like]: `%${destino}%`,
        },
      },
    });

    res.json({ success: true, data: rutas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 */
const crearRuta = async (req, res) => {
  try {
    await validarRutaPayload(req.body);
    const ruta = await Ruta.create(req.body);
    res.status(201).json({ success: true, message: "Ruta creada", data: ruta });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 */
const actualizarRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (!ruta) {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    await validarRutaPayload(req.body);
    await ruta.update(req.body);
    res.json({ success: true, message: "Ruta actualizada", data: ruta });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
 *       '404':
 *         description: Ruta no encontrada
 */
const eliminarRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (!ruta) {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    await ruta.destroy();
    res.json({ success: true, message: "Ruta eliminada" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  buscarPorDestino,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
};
