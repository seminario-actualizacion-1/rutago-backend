const perfilConductorService = require("../services/perfilconductor.service");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

exports.obtenerTodos = async (req, res) => {
  try {
    const perfiles = await perfilConductorService.obtenerTodos();
    res.json({ success: true, data: perfiles });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const perfil = await perfilConductorService.obtenerPorId(req.params.id);
    res.json({ success: true, data: perfil });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    const perfil = await perfilConductorService.obtenerPorUsuario(
      req.usuario.id,
    );
    if (!perfil) {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de conductor" });
    }
    res.json({ success: true, data: perfil });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearPerfil = async (req, res) => {
  try {
    const perfil = await perfilConductorService.crearPerfil(req.body);
    res.status(201).json({
      success: true,
      message: "Perfil de conductor creado",
      data: perfil,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const perfil = await perfilConductorService.actualizarPerfil(
      req.params.id,
      req.body,
    );
    res.json({ success: true, message: "Perfil actualizado", data: perfil });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const perfil = await perfilConductorService.actualizarMiPerfil(
      req.usuario.id,
      req.body,
    );
    res.json({
      success: true,
      message: "Perfil de conductor actualizado",
      data: perfil,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cambiarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const perfil = await perfilConductorService.actualizarEstado(
      req.params.id,
      estado,
    );
    res.json({ success: true, message: "Estado actualizado", data: perfil });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarPerfil = async (req, res) => {
  try {
    await perfilConductorService.eliminarPerfil(req.params.id);
    res.json({ success: true, message: "Perfil eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
