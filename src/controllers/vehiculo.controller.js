const vehiculoService = require("../services/vehiculo.service");
const perfilEntidadRepository = require("../repositories/perfilentidad.repository");
const vehiculoRepository = require("../repositories/vehiculo.repository");
const { ROLES } = require("../config/roles");
const vehiculoDto = require("../dtos/vehiculo.dto");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }
  res.status(400).json({ success: false, message: error.message });
};

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, estadoId, sortBy, sortOrder } = req.query;
    const resultado = await vehiculoService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      estadoId,
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
    const vehiculo = await vehiculoService.obtenerPorId(req.params.id);
    res.json({ success: true, data: vehiculoDto.paraRespuesta(vehiculo) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerUbicacion = async (req, res) => {
  try {
    const ubicacion = await vehiculoService.obtenerUbicacion(req.params.id);
    res.json({ success: true, data: ubicacion });
  } catch (error) {
    if (error.message === "VEHICULO_NO_ENCONTRADO") {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }
    manejarError(res, error);
  }
};

exports.actualizarUbicacion = async (req, res) => {
  try {
    const datos = vehiculoDto.paraActualizarUbicacion(req.body);
    const vehiculo = await vehiculoService.actualizarUbicacion(req.params.id, datos);
    res.json({
      success: true,
      message: "Ubicación actualizada",
      data: vehiculo,
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const datos = vehiculoDto.paraCrear(req.body);
    if (req.usuario.rolId === ROLES.ENTIDAD) {
      const entidad = await perfilEntidadRepository.obtenerPorUsuario(req.usuario.id);
      if (!entidad) {
        return res.status(400).json({ success: false, message: "No tienes un perfil de entidad." });
      }
      datos.entidadId = entidad.id;
    }
    const vehiculo = await vehiculoService.crearVehiculo(datos);
    res
      .status(201)
      .json({ success: true, message: "Vehículo creado", data: vehiculoDto.paraRespuesta(vehiculo) });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    if (req.usuario.rolId === ROLES.ENTIDAD) {
      const entidad = await perfilEntidadRepository.obtenerPorUsuario(req.usuario.id);
      if (!entidad) {
        return res.status(400).json({ success: false, message: "No tienes un perfil de entidad." });
      }
      const vehiculo = await vehiculoRepository.obtenerPorId(req.params.id);
      if (vehiculo.entidadId !== entidad.id) {
        return res.status(403).json({ success: false, message: "No puedes modificar vehículos de otra entidad." });
      }
    }
    const datos = vehiculoDto.paraActualizar(req.body);
    const vehiculo = await vehiculoService.actualizarVehiculo(req.params.id, datos);
    res.json({
      success: true,
      message: "Vehículo actualizado",
      data: vehiculoDto.paraRespuesta(vehiculo),
    });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    if (req.usuario.rolId === ROLES.ENTIDAD) {
      const entidad = await perfilEntidadRepository.obtenerPorUsuario(req.usuario.id);
      if (!entidad) {
        return res.status(400).json({ success: false, message: "No tienes un perfil de entidad." });
      }
      const vehiculo = await vehiculoRepository.obtenerPorId(req.params.id);
      if (vehiculo.entidadId !== entidad.id) {
        return res.status(403).json({ success: false, message: "No puedes eliminar vehículos de otra entidad." });
      }
    }
    await vehiculoService.eliminarVehiculo(req.params.id);
    res.json({ success: true, message: "Vehículo eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};
