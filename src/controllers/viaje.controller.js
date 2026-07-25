const viajeService = require("../services/viaje.service");
const viajeDto = require("../dtos/viaje.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder, estadoId } = req.query;
    const resultado = await viajeService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder,
      estadoId
    );
    res.json({ success: true, data: resultado.data.map(viajeDto.paraRespuesta), paginacion: resultado.paginacion });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerDisponibles = async (req, res) => {
  try {
    const viajes = await viajeService.obtenerDisponibles(req.usuario.id);
    res.json({ success: true, data: viajes.map(viajeDto.paraRespuesta) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const viaje = await viajeService.obtenerPorId(req.params.id);
    res.json({ success: true, data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerMisViajes = async (req, res) => {
  try {
    const viajes = await viajeService.obtenerMisViajes(req.usuario.id, req.usuario.rolId);
    res.json({ success: true, data: viajes.map(viajeDto.paraRespuesta) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearViaje = async (req, res) => {
  try {
    const datos = viajeDto.paraCrear(req.body);
    datos.pasajeroId = req.usuario.id;
    if (req.body.precioEstimado !== undefined) datos.precioEstimado = req.body.precioEstimado;
    if (req.body.conductorId !== undefined) datos.conductorId = req.body.conductorId;
    const viaje = await viajeService.crearViaje(datos);
    res
      .status(201)
      .json({ success: true, message: "Viaje solicitado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    if (error.message === "PRECIO_INVALIDO") {
      return res.status(400).json({
        success: false,
        message: "El precio estimado no es válido",
      });
    }
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res.status(400).json({
        success: false,
        message: "La ruta seleccionada no existe",
      });
    }
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res.status(400).json({
        success: false,
        message: "El horario seleccionado no existe",
      });
    }
    if (error.message === "HORARIO_NO_PERTENECE_A_RUTA") {
      return res.status(400).json({
        success: false,
        message: "El horario no pertenece a la ruta seleccionada",
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarViaje = async (req, res) => {
  try {
    const datos = viajeDto.paraActualizar(req.body);
    const viaje = await viajeService.actualizarViaje(req.params.id, datos);
    res.json({ success: true, message: "Viaje actualizado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    if (error.message === "VIAJE_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Viaje no encontrado" });
    }
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res.status(400).json({ success: false, message: "La ruta no existe" });
    }
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res.status(400).json({ success: false, message: "El horario no existe" });
    }
    if (error.message === "HORARIO_NO_PERTENECE_A_RUTA") {
      return res.status(400).json({ success: false, message: "El horario no pertenece a la ruta" });
    }
    if (error.message === "CONDUCTOR_SIN_PERFIL") {
      return res.status(400).json({ success: false, message: "El conductor no tiene perfil" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.aceptarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(req.params.id, 2, req.usuario.id);
    res.json({ success: true, message: "Viaje aceptado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    if (error.message === "CONDUCTOR_OCUPADO_EN_HORARIO") {
      return res.status(400).json({ success: false, message: "Ya tienes un viaje asignado en ese horario" });
    }
    manejarError(res, error);
  }
};

exports.iniciarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(req.params.id, 3);
    res.json({ success: true, message: "Viaje iniciado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.finalizarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(req.params.id, 4);
    res.json({ success: true, message: "Viaje finalizado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.cancelarViaje = async (req, res) => {
  try {
    const viaje = await viajeService.actualizarEstado(req.params.id, 5);
    res.json({ success: true, message: "Viaje cancelado", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerDisponiblesPasajero = async (req, res) => {
  try {
    const viajes = await viajeService.obtenerDisponiblesPasajero(req.usuario.id);
    res.json({ success: true, data: viajes.map(viajeDto.paraRespuesta) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.unirseAViaje = async (req, res) => {
  try {
    const viaje = await viajeService.unirseAViaje(req.params.id, req.usuario.id);
    res.json({ success: true, message: "Te has unido al viaje", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    if (error.message === "VIAJE_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Viaje no encontrado" });
    }
    if (error.message === "VIAJE_NO_DISPONIBLE") {
      return res.status(400).json({ success: false, message: "El viaje no está disponible para unirse" });
    }
    if (error.message === "YA_ES_PASAJERO") {
      return res.status(400).json({ success: false, message: "Ya eres pasajero de este viaje" });
    }
    if (error.message === "VIAJE_SIN_CUPO") {
      return res.status(400).json({ success: false, message: "El viaje no tiene cupos disponibles" });
    }
    manejarError(res, error);
  }
};

exports.bajarseDeViaje = async (req, res) => {
  try {
    const viaje = await viajeService.bajarseDeViaje(req.params.id, req.usuario.id);
    res.json({ success: true, message: "Te has retirado del viaje", data: viajeDto.paraRespuesta(viaje) });
  } catch (error) {
    if (error.message === "VIAJE_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Viaje no encontrado" });
    }
    if (error.message === "NO_ES_PASAJERO") {
      return res.status(400).json({ success: false, message: "No eres pasajero de este viaje" });
    }
    manejarError(res, error);
  }
};

exports.eliminarViaje = async (req, res) => {
  try {
    await viajeService.eliminarViaje(req.params.id);
    res.json({ success: true, message: "Viaje eliminado permanentemente" });
  } catch (error) {
    if (error.message === "VIAJE_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Viaje no encontrado" });
    }
    manejarError(res, error);
  }
};
