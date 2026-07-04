const perfilEntidadService = require("../services/perfilentidad.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADA")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await perfilEntidadService.obtenerTodos(
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
    const entidad = await perfilEntidadService.obtenerPorId(req.params.id);
    res.json({ success: true, data: entidad });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMiEntidad = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.obtenerPorUsuario(
      req.usuario.id,
    );
    res.json({ success: true, data: entidad });
  } catch (error) {
    if (error.message === "ENTIDAD_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de entidad" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearEntidad = async (req, res) => {
  try {
    const { usuarioId, razonSocial, nit, telefonoContacto } = req.body;
    const entidad = await perfilEntidadService.crearEntidad({ usuarioId, razonSocial, nit, telefonoContacto });
    res.status(201).json({
      success: true,
      message: "Perfil de entidad creado",
      data: entidad,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarEntidad = async (req, res) => {
  try {
    const { razonSocial, nit, telefonoContacto } = req.body;
    const entidad = await perfilEntidadService.actualizarEntidad(
      req.params.id,
      { razonSocial, nit, telefonoContacto },
    );
    res.json({ success: true, message: "Perfil actualizado", data: entidad });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarMiEntidad = async (req, res) => {
  try {
    const entidad = await perfilEntidadService.actualizarMiEntidad(
      req.usuario.id,
      req.body,
    );
    res.json({
      success: true,
      message: "Perfil de entidad actualizado",
      data: entidad,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarEntidad = async (req, res) => {
  try {
    await perfilEntidadService.eliminarEntidad(req.params.id);
    res.json({ success: true, message: "Perfil eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
