const comunaService = require("../services/comuna.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADA")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodas = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await comunaService.obtenerTodas(
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
    const comuna = await comunaService.obtenerPorId(req.params.id);
    res.json({ success: true, data: comuna });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearComuna = async (req, res) => {
  try {
    const { nombre } = req.body;
    const comuna = await comunaService.crearComuna({ nombre });
    res
      .status(201)
      .json({ success: true, message: "Comuna creada", data: comuna });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarComuna = async (req, res) => {
  try {
    const { nombre } = req.body;
    const comuna = await comunaService.actualizarComuna(
      req.params.id,
      { nombre },
    );
    res.json({ success: true, message: "Comuna actualizada", data: comuna });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarComuna = async (req, res) => {
  try {
    await comunaService.eliminarComuna(req.params.id);
    res.json({ success: true, message: "Comuna eliminada" });
  } catch (error) {
    manejarError(res, error);
  }
};
