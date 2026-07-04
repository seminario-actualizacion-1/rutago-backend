const vehiculoService = require("../services/vehiculo.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, estado, sortBy, sortOrder } = req.query;
    const resultado = await vehiculoService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      estado,
      sortBy,
      sortOrder
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.obtenerPorId(req.params.id);
    res.json({ success: true, data: vehiculo });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerUbicacion = async (req, res) => {
  try {
    const ubicacion = await vehiculoService.obtenerUbicacion(req.params.id);
    res.json({ success: true, data: ubicacion });
  } catch (error) {
    if (error.message === "VEHICULO_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }
    manejarError(res, error);
  }
};

exports.actualizarUbicacion = async (req, res) => {
  try {
    const { latitud, longitud, estado } = req.body;
    const vehiculo = await vehiculoService.actualizarUbicacion(req.params.id, { latitud, longitud, estado });
    res.json({
      success: true,
      message: "Ubicación actualizada",
      data: vehiculo,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.crearVehiculo(req.body);
    res
      .status(201)
      .json({ success: true, message: "Vehículo creado", data: vehiculo });
  } catch (error) {
    manejarError(res, error);
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
    manejarError(res, error);
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    await vehiculoService.eliminarVehiculo(req.params.id);
    res.json({ success: true, message: "Vehículo eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
