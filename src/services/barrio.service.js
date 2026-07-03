const barrioRepository = require("../repositories/barrio.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, filtros = {}) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await barrioRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    filtros
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await barrioRepository.obtenerPorId(id);
};

exports.obtenerPorComuna = async (comunaId) => {
  return await barrioRepository.obtenerPorComuna(comunaId);
};

exports.crearBarrio = async (datos) => {
  return await barrioRepository.crearBarrio(datos);
};

exports.actualizarBarrio = async (id, datos) => {
  return await barrioRepository.actualizarBarrio(id, datos);
};

exports.eliminarBarrio = async (id) => {
  return await barrioRepository.eliminarBarrio(id);
};
