const barrioService = require("../services/barrio.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const barrios = await barrioService.obtenerTodos();
    res.json({ success: true, data: barrios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const barrio = await barrioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: barrio });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorComuna = async (req, res) => {
  try {
    const barrios = await barrioService.obtenerPorComuna(req.params.comunaId);
    res.json({ success: true, data: barrios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearBarrio = async (req, res) => {
  try {
    const barrio = await barrioService.crearBarrio(req.body);
    res
      .status(201)
      .json({ success: true, message: "Barrio creado", data: barrio });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarBarrio = async (req, res) => {
  try {
    const barrio = await barrioService.actualizarBarrio(
      req.params.id,
      req.body,
    );
    res.json({ success: true, message: "Barrio actualizado", data: barrio });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarBarrio = async (req, res) => {
  try {
    await barrioService.eliminarBarrio(req.params.id);
    res.json({ success: true, message: "Barrio eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
