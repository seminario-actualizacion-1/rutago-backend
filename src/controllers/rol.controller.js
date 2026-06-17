const rolService = require("../services/rol.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const roles = await rolService.obtenerTodos();
    res.json({ success: true, data: roles });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const rol = await rolService.obtenerPorId(req.params.id);
    res.json({ success: true, data: rol });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
