const viajeService = require("../services/viaje.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const viajes = await viajeService.obtenerTodos();
    res.json({ success: true, data: viajes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const viaje = await viajeService.obtenerPorId(req.params.id);
    res.json({ success: true, data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearViaje = async (req, res) => {
  try {
    const datos = { ...req.body, pasajeroId: req.usuario.id };
    const viaje = await viajeService.crearViaje(datos);
    res
      .status(201)
      .json({ success: true, message: "Viaje solicitado", data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.aceptarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      "ACEPTADO",
      req.usuario.id,
    );
    res.json({ success: true, message: "Viaje aceptado", data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.iniciarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      "EN_CURSO",
    );
    res.json({ success: true, message: "Viaje iniciado", data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.finalizarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      "FINALIZADO",
    );
    res.json({ success: true, message: "Viaje finalizado", data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cancelarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(
      req.params.id,
      "CANCELADO",
    );
    res.json({ success: true, message: "Viaje cancelado", data: viaje });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
