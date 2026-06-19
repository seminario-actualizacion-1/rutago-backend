const vehiculoService = require("../services/vehiculo.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const vehiculos = await vehiculoService.obtenerTodos();
    res.json({ success: true, data: vehiculos });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.obtenerPorId(req.params.id);
    res.json({ success: true, data: vehiculo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/vehiculos/{id}/ubicacion:
 *   get:
 *     summary: Obtiene la ubicación actual de un vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ubicación del vehículo
 *       '404':
 *         description: Vehículo no encontrado
 */
exports.obtenerUbicacion = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.obtenerPorId(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }
    
    res.json({
      success: true,
      data: {
        id: vehiculo.id,
        placa: vehiculo.placa,
        estado: vehiculo.estado,
        latitud: vehiculo.latitud,
        longitud: vehiculo.longitud,
        ultimaActualizacion: vehiculo.ultimaActualizacion,
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/vehiculos/{id}/ubicacion:
 *   put:
 *     summary: Actualiza la ubicación de un vehículo (para conductores)
 *     tags: [Vehículos]
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
 *               latitud:
 *                 type: number
 *               longitud:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [EN_TERMINAL, EN_RUTA, PROXIMO]
 *     responses:
 *       '200':
 *         description: Ubicación actualizada
 *       '404':
 *         description: Vehículo no encontrado
 */
exports.actualizarUbicacion = async (req, res) => {
  try {
    const { latitud, longitud, estado } = req.body;
    const vehiculo = await vehiculoService.actualizarVehiculo(req.params.id, {
      latitud,
      longitud,
      estado,
      ultimaActualizacion: new Date(),
    });
    res.json({
      success: true,
      message: "Ubicación actualizada",
      data: vehiculo,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.crearVehiculo(req.body);
    res
      .status(201)
      .json({ success: true, message: "Vehículo creado", data: vehiculo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.actualizarVehiculo(
      req.params.id,
      req.body,
    );
    res.json({
      success: true,
      message: "Vehículo actualizado",
      data: vehiculo,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    await vehiculoService.eliminarVehiculo(req.params.id);
    res.json({ success: true, message: "Vehículo eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
