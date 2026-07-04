const barrioRepository = require("../repositories/barrio.repository");
const comunaRepository = require("../repositories/comuna.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, filtros = {}, sortBy = "id", sortOrder = "ASC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await barrioRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    filtros,
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
  return await barrioRepository.obtenerPorId(id);
};

exports.obtenerPorComuna = async (comunaId) => {
  return await barrioRepository.obtenerPorComuna(comunaId);
};

exports.crearBarrio = async (datos) => {
  const { comunaId } = datos;
  const comuna = await comunaRepository.obtenerPorId(comunaId);
  if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  return await barrioRepository.crearBarrio(datos);
};

exports.actualizarBarrio = async (id, datos) => {
  if (datos.comunaId) {
    const comuna = await comunaRepository.obtenerPorId(datos.comunaId);
    if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  }
  return await barrioRepository.actualizarBarrio(id, datos);
};

exports.eliminarBarrio = async (id) => {
  return await barrioRepository.eliminarBarrio(id);
};
