const perfilEntidadService = require("../services/perfilentidad.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const entidades = await perfilEntidadService.obtenerTodos();
    res.json({ success: true, data: entidades });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.obtenerPorId(req.params.id);
    res.json({ success: true, data: entidad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerMiEntidad = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.obtenerPorUsuario(
      req.usuario.id,
    );
    if (!entidad) {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de entidad" });
    }
    res.json({ success: true, data: entidad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearEntidad = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.crearEntidad(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Perfil de entidad creado",
        data: entidad,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarEntidad = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.actualizarEntidad(
      req.params.id,
      req.body,
    );
    res.json({ success: true, message: "Perfil actualizado", data: entidad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarEntidad = async (req, res) => {
  try {
    await perfilEntidadService.eliminarEntidad(req.params.id);
    res.json({ success: true, message: "Perfil eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
