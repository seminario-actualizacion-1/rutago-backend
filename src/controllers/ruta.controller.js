const { Ruta, Comuna, Barrio, Horario, Vehiculo } = require("../models");

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
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
          include: [{ model: Vehiculo, as: "vehiculo" }]
        },
      ],
    });
    if (!ruta) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }
    res.json(ruta);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
          as: "horarios"
        },
      ],
      where: {
        "$destino.nombre$": {
          [require("sequelize").Op.like]: `%${destino}%`,
        },
      },
    });

    res.json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const ruta = await Ruta.create(req.body);
    res.status(201).json(ruta);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ error: "Ruta no encontrada" });
    }
    await ruta.update(req.body);
    res.json(ruta);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ error: "Ruta no encontrada" });
    }
    await ruta.destroy();
    res.json({ message: "Ruta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
