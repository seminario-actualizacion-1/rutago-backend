const comunaService = require("../services/comuna.service");

exports.obtenerTodas = async (req, res) => {
  try {
    const comunas = await comunaService.obtenerTodas();
    res.json({ success: true, data: comunas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const comuna = await comunaService.obtenerPorId(req.params.id);
    res.json({ success: true, data: comuna });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearComuna = async (req, res) => {
  try {
    const comuna = await comunaService.crearComuna(req.body);
    res
      .status(201)
      .json({ success: true, message: "Comuna creada", data: comuna });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarComuna = async (req, res) => {
  try {
    const comuna = await comunaService.actualizarComuna(
      req.params.id,
      req.body,
    );
    res.json({ success: true, message: "Comuna actualizada", data: comuna });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarComuna = async (req, res) => {
  try {
    await comunaService.eliminarComuna(req.params.id);
    res.json({ success: true, message: "Comuna eliminada" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
