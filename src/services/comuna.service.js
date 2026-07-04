const comunaRepository = require("../repositories/comuna.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodas = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "nombre", sortOrder = "ASC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await comunaRepository.obtenerTodasConPaginacion(
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
  return await comunaRepository.obtenerPorId(id);
};

exports.crearComuna = async (datos) => {
  return await comunaRepository.crearComuna(datos);
};

exports.actualizarComuna = async (id, datos) => {
  return await comunaRepository.actualizarComuna(id, datos);
};

exports.eliminarComuna = async (id) => {
  return await comunaRepository.eliminarComuna(id);
};
