const perfilPasajeroService = require("../services/perfilpasajero.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: error.message });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina } = req.query;
    const resultado = await perfilPasajeroService.obtenerTodos(
      paginaActual,
      registrosPorPagina
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.obtenerPorId(req.params.id);
    res.json({ success: true, data: perfil });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorUsuarioId = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.obtenerPorUsuario(
      req.params.usuarioId,
    );
    res.json({ success: true, data: perfil });
  } catch (error) {
    if (error.message === "PERFIL_PASAJERO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Perfil de pasajero no encontrado" });
    }
    manejarError(res, error);
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.obtenerPorUsuario(
      req.usuario.id,
    );
    res.json({ success: true, data: perfil });
  } catch (error) {
    if (error.message === "PERFIL_PASAJERO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de pasajero" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearPerfil = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.crearPerfil(req.body);
    res.status(201).json({
      success: true,
      message: "Perfil de pasajero creado",
      data: perfil,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.actualizarPerfil(
      req.params.id,
      req.body,
    );
    res.json({ success: true, message: "Perfil actualizado", data: perfil });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const perfil = await perfilPasajeroService.actualizarMiPerfil(
      req.usuario.id,
      req.body,
    );
    res.json({
      success: true,
      message: "Perfil de pasajero actualizado",
      data: perfil,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarPerfil = async (req, res) => {
  try {
    await perfilPasajeroService.eliminarPerfil(req.params.id);
    res.json({ success: true, message: "Perfil eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
