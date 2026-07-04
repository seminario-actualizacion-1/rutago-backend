const horarioRepository = require("../repositories/horario.repository");
const vehiculoRepository = require("../repositories/vehiculo.repository");
const rutaRepository = require("../repositories/ruta.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "id", sortOrder = "ASC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await horarioRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    q,
    sortBy,
    sortOrder
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await horarioRepository.obtenerPorId(id);
};

exports.obtenerPorRuta = async (rutaId) => {
  return await horarioRepository.obtenerPorRuta(rutaId);
};

exports.obtenerPorVehiculo = async (vehiculoId) => {
  return await horarioRepository.obtenerPorVehiculo(vehiculoId);
};

exports.crearHorario = async (datos) => {
  const { vehiculoId, rutaId, horaSalida } = datos;

  if (!vehiculoId || !rutaId || !horaSalida) {
    throw new Error("VEHICULO_RUTA_Y_HORA_SON_OBLIGATORIOS");
  }

  const vehiculo = await vehiculoRepository.obtenerPorId(vehiculoId);
  if (!vehiculo) {
    throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  const ruta = await rutaRepository.obtenerPorId(rutaId);
  if (!ruta) {
    throw new Error("RUTA_NO_ENCONTRADA");
  }

  return await horarioRepository.crearHorario(datos);
};

exports.actualizarHorario = async (id, datos) => {
  const { vehiculoId, rutaId, horaSalida } = datos;

  if (!vehiculoId || !rutaId || !horaSalida) {
    throw new Error("VEHICULO_RUTA_Y_HORA_SON_OBLIGATORIOS");
  }

  const vehiculo = await vehiculoRepository.obtenerPorId(vehiculoId);
  if (!vehiculo) {
    throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  const ruta = await rutaRepository.obtenerPorId(rutaId);
  if (!ruta) {
    throw new Error("RUTA_NO_ENCONTRADA");
  }

  return await horarioRepository.actualizarHorario(id, datos);
};

exports.eliminarHorario = async (id) => {
  return await horarioRepository.eliminarHorario(id);
};
