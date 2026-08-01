const horarioRepository = require("../repositories/horario.repository");
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

exports.crearHorario = async (datos) => {
  const { rutaId, horaSalida } = datos;

  if (!rutaId || !horaSalida) {
    throw new Error("RUTA_Y_HORA_SON_OBLIGATORIOS");
  }

  const ruta = await rutaRepository.obtenerPorId(rutaId);
  if (!ruta) {
    throw new Error("RUTA_NO_ENCONTRADA");
  }

  return await horarioRepository.crearHorario(datos);
};

exports.actualizarHorario = async (id, datos) => {
  const { rutaId, horaSalida } = datos;

  if (rutaId) {
    const ruta = await rutaRepository.obtenerPorId(rutaId);
    if (!ruta) {
      throw new Error("RUTA_NO_ENCONTRADA");
    }
  }

  return await horarioRepository.actualizarHorario(id, datos);
};

exports.eliminarHorario = async (id) => {
  return await horarioRepository.eliminarHorario(id);
};
