const viajeService = require("../services/viaje.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await viajeService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
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
    const viaje = await viajeService.obtenerPorId(req.params.id);
    res.json({ success: true, data: viaje });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMisViajes = async (req, res) => {
  try {
    const viajes = await viajeService.obtenerMisViajes(
      req.usuario.id,
      req.usuario.rolId,
    );
    res.json({ success: true, data: viajes });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearViaje = async (req, res) => {
  try {
    const { barrioOrigenId, barrioDestinoId, precioEstimado, conductorId } = req.body;
    const datos = { barrioOrigenId, barrioDestinoId, precioEstimado, conductorId, pasajeroId: req.usuario.id };
    // Filtrar undefined
    Object.keys(datos).forEach(key => datos[key] === undefined && delete datos[key]);
    const viaje = await viajeService.crearViaje(datos);
    res
      .status(201)
      .json({ success: true, message: "Viaje solicitado", data: viaje });
  } catch (error) {
    if (error.message === "NO_PUEDE_SOLICITAR_VIAJE_A_SI_MISMO") {
      return res.status(400).json({
        success: false,
        message: "No puedes solicitarte un viaje a ti mismo",
      });
    }
    if (error.message === "PRECIO_DEBE_SER_MAYOR_A_CERO") {
      return res.status(400).json({
        success: false,
        message: "El precio estimado debe ser mayor a 0",
      });
    }
    if (error.message === "BARRIO_ORIGEN_NO_ENCONTRADO") {
      return res.status(400).json({
        success: false,
        message: "El barrio de origen no existe",
      });
    }
    if (error.message === "BARRIO_DESTINO_NO_ENCONTRADO") {
      return res.status(400).json({
        success: false,
        message: "El barrio de destino no existe",
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.aceptarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      2,
      req.usuario.id,
    );
    res.json({ success: true, message: "Viaje aceptado", data: viaje });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.iniciarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      3,
    );
    res.json({ success: true, message: "Viaje iniciado", data: viaje });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.finalizarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      4,
    );
    res.json({ success: true, message: "Viaje finalizado", data: viaje });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.cancelarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      5,
    );
    res.json({ success: true, message: "Viaje cancelado", data: viaje });
  } catch (error) {
    manejarError(res, error);
  }
};
