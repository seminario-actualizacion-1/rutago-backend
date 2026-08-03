const entidadService = require("../services/entidad.service");
const entidadDto = require("../dtos/entidad.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADA")) {
    return res
      .status(404)
      .json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } =
      req.query;
    const resultado = await entidadService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder,
    );
    res.json({
      success: true,
      data: resultado.data.map(entidadDto.RespuestaEntidadesDto),
      paginacion: resultado.paginacion,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const entidad = await entidadService.obtenerPorId(req.params.id);
    res.json({
      success: true,
      data: entidadDto.RespuestaEntidadesDto(entidad),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMiEntidad = async (req, res) => {
  try {
    const entidad = await entidadService.obtenerPorUsuario(req.usuario.id);
    res.json({
      success: true,
      data: entidadDto.RespuestaEntidadesDto(entidad),
    });
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
    const datos = req.body;
    const entidad = await entidadService.crearEntidad(datos);
    res.status(201).json({
      success: true,
      message: "Entidad creada",
      data: entidadDto.RespuestaEntidadesDto(entidad),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarEntidad = async (req, res) => {
  try {
    const datos = req.body;
    const entidad = await entidadService.actualizarEntidad(
      req.params.id,
      datos,
    );
    res.json({
      success: true,
      message: "Entidad actualizada",
      data: entidadDto.RespuestaEntidadesDto(entidad),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarMiEntidad = async (req, res) => {
  try {
    const datos = req.body;
    const entidad = await entidadService.actualizarMiEntidad(
      req.usuario.id,
      datos,
    );
    res.json({
      success: true,
      message: "Entidad actualizada",
      data: entidadDto.RespuestaEntidadesDto(entidad),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearConUsuario = async (req, res) => {
  try {
    const resultado = await entidadService.crearConUsuario(req.body);
    res.status(201).json({
      success: true,
      message: "Entidad creada exitosamente",
      data: entidadDto.RespuestaEntidadesDto(resultado.entidad),
    });
  } catch (error) {
    if (error.message === "EL_CORREO_YA_EXISTE") {
      return res.status(400).json({
        success: false,
        message: "El correo electrónico ya está registrado.",
      });
    }
    manejarError(res, error);
  }
};

exports.eliminar = async (req, res) => {
  try {
    await entidadService.eliminar(req.params.id);
    res.json({ success: true, message: "Entidad eliminada" });
  } catch (error) {
    manejarError(res, error);
  }
};
