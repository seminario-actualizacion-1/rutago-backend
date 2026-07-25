const horarioService = require("../services/horario.service");
const horarioDto = require("../dtos/horario.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await horarioService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder
    );
    res.json({ success: true, data: resultado.data.map(horarioDto.paraRespuesta), paginacion: resultado.paginacion });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorRuta = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorRuta(req.params.rutaId);
    res.json({ success: true, data: horarios.map(horarioDto.paraRespuesta) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorVehiculo = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorVehiculo(req.params.vehiculoId);
    res.json({ success: true, data: horarios.map(horarioDto.paraRespuesta) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const horario = await horarioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: horarioDto.paraRespuesta(horario) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearHorario = async (req, res) => {
  try {
    const datos = horarioDto.paraCrear(req.body);
    const horario = await horarioService.crearHorario(datos);
    res.status(201).json({ success: true, message: "Horario creado", data: horarioDto.paraRespuesta(horario) });
  } catch (error) {
    if (error.message === "HORARIO_YA_EXISTE") {
      return res.status(400).json({ success: false, message: "Ya existe un horario con esos datos" });
    }
    manejarError(res, error);
  }
};

exports.actualizarHorario = async (req, res) => {
  try {
    const datos = horarioDto.paraActualizar(req.body);
    const horario = await horarioService.actualizarHorario(req.params.id, datos);
    res.json({ success: true, message: "Horario actualizado", data: horarioDto.paraRespuesta(horario) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarHorario = async (req, res) => {
  try {
    await horarioService.eliminarHorario(req.params.id);
    res.json({ success: true, message: "Horario eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
