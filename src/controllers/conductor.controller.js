const conductorService = require("../services/conductor.service");
const conductorDto = require("../dtos/conductor.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res
      .status(404)
      .json({ success: false, message: "Recurso no encontrado" });
  }
  if (error.message === "CONDUCTOR_TIENE_VIAJE_ACTIVO") {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "El conductor tiene un viaje activo. Finaliza o cancela el viaje antes de cambiar su estado.",
      });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } =
      req.query;
    const resultado = await conductorService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder,
    );
    res.json({
      success: true,
      data: resultado.data.map(conductorDto.RespuestaConductoresDto),
      paginacion: resultado.paginacion,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const conductor = await conductorService.obtenerPorId(req.params.id);
    res.json({ success: true, data: conductorDto.RespuestaConductoresDto(conductor) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    const conductor = await conductorService.obtenerPorUsuario(
      req.usuario.id,
    );
    res.json({ success: true, data: conductorDto.RespuestaConductoresDto(conductor) });
  } catch (error) {
    if (error.message === "CONDUCTOR_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "No tienes perfil de conductor" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const datos = req.body;
    const conductor = await conductorService.crear(datos);
    res.status(201).json({
      success: true,
      message: "Conductor creado",
      data: conductorDto.RespuestaConductoresDto(conductor),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizar = async (req, res) => {
  try {
    const datos = req.body;
    const conductor = await conductorService.actualizar(
      req.params.id,
      datos,
    );
    res.json({
      success: true,
      message: "Conductor actualizado",
      data: conductorDto.RespuestaConductoresDto(conductor),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const datos = req.body;
    const conductor = await conductorService.actualizarMiPerfil(
      req.usuario.id,
      datos,
    );
    res.json({
      success: true,
      message: "Conductor actualizado",
      data: conductorDto.RespuestaConductoresDto(conductor),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.cambiarEstado = async (req, res) => {
  try {
    const { estadoId } = req.body;
    const conductor = await conductorService.actualizarEstado(
      req.params.id,
      estadoId,
    );
    res.json({ success: true, message: "Estado actualizado", data: conductor });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearConUsuario = async (req, res) => {
  try {
    const resultado = await conductorService.crearConUsuario(req.body);
    res.status(201).json({
      success: true,
      message: "Conductor creado exitosamente",
      data: conductorDto.RespuestaConductoresDto(resultado.conductor),
    });
  } catch (error) {
    if (error.message === "EL_CORREO_YA_EXISTE") {
      return res
        .status(400)
        .json({
          success: false,
          message: "El correo electrónico ya está registrado.",
        });
    }
    manejarError(res, error);
  }
};

exports.eliminar = async (req, res) => {
  try {
    await conductorService.eliminar(req.params.id);
    res.json({ success: true, message: "Conductor eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
