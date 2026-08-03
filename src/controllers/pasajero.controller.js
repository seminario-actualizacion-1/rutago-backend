const pasajeroService = require("../services/pasajero.service");
const pasajeroDto = require("../dtos/pasajero.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res
      .status(404)
      .json({ success: false, message: "Recurso no encontrado" });
  }
  if (error.message === "EL_CORREO_YA_EXISTE") {
    return res.status(400).json({
      success: false,
      message: "El correo electrónico ya está registrado.",
    });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } =
      req.query;
    const resultado = await pasajeroService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder,
    );
    res.json({
      success: true,
      data: resultado.data.map(pasajeroDto.RespuestaPasajerosDto),
      paginacion: resultado.paginacion,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const pasajero = await pasajeroService.obtenerPorId(req.params.id);
    res.json({
      success: true,
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorUsuarioId = async (req, res) => {
  try {
    const pasajero = await pasajeroService.obtenerPorUsuario(
      req.params.usuarioId,
    );
    res.json({
      success: true,
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    if (error.message === "PASAJERO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Perfil de pasajero no encontrado" });
    }
    manejarError(res, error);
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    const pasajero = await pasajeroService.obtenerPorUsuario(req.usuario.id);
    res.json({
      success: true,
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    if (error.message === "PASAJERO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de pasajero" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const datos = req.body;
    const pasajero = await pasajeroService.crear(datos);
    res.status(201).json({
      success: true,
      message: "Pasajero creado",
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizar = async (req, res) => {
  try {
    const datos = req.body;
    const pasajero = await pasajeroService.actualizar(req.params.id, datos);
    res.json({
      success: true,
      message: "Pasajero actualizado",
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const datos = req.body;
    const pasajero = await pasajeroService.actualizarMiPerfil(
      req.usuario.id,
      datos,
    );
    res.json({
      success: true,
      message: "Pasajero actualizado",
      data: pasajeroDto.RespuestaPasajerosDto(pasajero),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearConUsuario = async (req, res) => {
  try {
    const resultado = await pasajeroService.crearConUsuario(req.body);
    res.status(201).json({
      success: true,
      message: "Pasajero creado exitosamente",
      data: pasajeroDto.RespuestaPasajerosDto(resultado.pasajero),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminar = async (req, res) => {
  try {
    await pasajeroService.eliminar(req.params.id);
    res.json({ success: true, message: "Pasajero eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
