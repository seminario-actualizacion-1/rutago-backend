const barrioService = require("../services/barrio.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: error.message });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, comunaId } = req.query;
    const resultado = await barrioService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      { comunaId }
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const barrio = await barrioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: barrio });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorComuna = async (req, res) => {
  try {
    const barrios = await barrioService.obtenerPorComuna(req.params.comunaId);
    res.json({ success: true, data: barrios });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearBarrio = async (req, res) => {
  try {
    const barrio = await barrioService.crearBarrio(req.body);
    res
      .status(201)
      .json({ success: true, message: "Barrio creado", data: barrio });
  } catch (error) {
    manejarError(res, error);
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
    manejarError(res, error);
  }
};

exports.eliminarBarrio = async (req, res) => {
  try {
    await barrioService.eliminarBarrio(req.params.id);
    res.json({ success: true, message: "Barrio eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
