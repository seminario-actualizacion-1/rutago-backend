const rolService = require("../services/rol.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const roles = await rolService.obtenerTodos();
    res.json({ success: true, data: roles });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const rol = await rolService.obtenerPorId(req.params.id);
    res.json({ success: true, data: rol });
  } catch (error) {
    manejarError(res, error);
  }
};
