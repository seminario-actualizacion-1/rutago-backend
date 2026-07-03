const rutaService = require("../services/ruta.service");

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
exports.obtenerTodas = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina } = req.query;
    const resultado = await rutaService.obtenerTodas(
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
exports.obtenerPorId = async (req, res) => {
  try {
    const ruta = await rutaService.obtenerPorId(req.params.id);
    res.json({ success: true, data: ruta });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
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
exports.buscarPorDestino = async (req, res) => {
  try {
    const { destino } = req.params;
    const rutas = await rutaService.buscarPorDestino(destino);
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
exports.crearRuta = async (req, res) => {
  try {
    const ruta = await rutaService.crearRuta(req.body);
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
exports.actualizarRuta = async (req, res) => {
  try {
    const ruta = await rutaService.actualizarRuta(req.params.id, req.body);
    res.json({ success: true, message: "Ruta actualizada", data: ruta });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
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
exports.eliminarRuta = async (req, res) => {
  try {
    await rutaService.eliminarRuta(req.params.id);
    res.json({ success: true, message: "Ruta eliminada" });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
