const perfilConductorService = require("../services/perfilconductor.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await perfilConductorService.obtenerTodos(
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
    const perfil = await perfilConductorService.obtenerPorId(req.params.id);
    res.json({ success: true, data: perfil });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    const perfil = await perfilConductorService.obtenerPorUsuario(
      req.usuario.id,
    );
    res.json({ success: true, data: perfil });
  } catch (error) {
    if (error.message === "PERFIL_CONDUCTOR_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de conductor" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearPerfil = async (req, res) => {
  try {
    const { usuarioId, vehiculoId, licenciaConducir, estado } = req.body;
    const perfil = await perfilConductorService.crearPerfil({ usuarioId, vehiculoId, licenciaConducir, estado });
    res.status(201).json({
      success: true,
      message: "Perfil de conductor creado",
      data: perfil,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const { vehiculoId, licenciaConducir, estado } = req.body;
    const perfil = await perfilConductorService.actualizarPerfil(
      req.params.id,
      { vehiculoId, licenciaConducir, estado },
    );
    res.json({ success: true, message: "Perfil actualizado", data: perfil });
  } catch (error) {
    manejarError(res, error);
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
    manejarError(res, error);
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
    manejarError(res, error);
  }
};

exports.eliminarPerfil = async (req, res) => {
  try {
    await perfilConductorService.eliminarPerfil(req.params.id);
    res.json({ success: true, message: "Perfil eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
