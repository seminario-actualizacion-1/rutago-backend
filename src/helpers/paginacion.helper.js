/**
 * Formatea la respuesta paginada con metadata
 * @param {Array} data - Datos que trae la página actual
 * @param {number} totalRegistros - Contador de todos los registros de la BD
 * @param {number} paginaActual - Página actual solicitada
 * @param {number} registrosPorPagina - Total de registros que trae una página
 * @returns {Object} Respuesta formateada con datos y metadata de paginación
 */
const formatearRespuestaPaginada = (
  data,
  totalRegistros,
  paginaActual,
  registrosPorPagina
) => {
  // Validar y normalizar parámetros
  const paginaActualNormalizada = Math.max(1, parseInt(paginaActual) || 1);
  const registrosPorPaginaNormalizados = Math.max(1, parseInt(registrosPorPagina) || 10);
  const totalRegistrosNormalizados = Math.max(0, parseInt(totalRegistros) || 0);

  // Calcular total de páginas (manejar caso de 0 registros)
  const totalPaginas = totalRegistrosNormalizados > 0 
    ? Math.ceil(totalRegistrosNormalizados / registrosPorPaginaNormalizados)
    : 1;

  return {
    data,
    paginacion: {
      paginaActual: paginaActualNormalizada,
      registrosPorPagina: registrosPorPaginaNormalizados,
      totalPaginas,
      totalRegistros: totalRegistrosNormalizados,
      tienePaginaAnterior: paginaActualNormalizada > 1,
      tienePaginaSiguiente: paginaActualNormalizada < totalPaginas,
    },
  };
};

/**
 * Calcula el offset para la consulta SQL
 * @param {number} paginaActual - Página actual solicitada
 * @param {number} registrosPorPagina - Cantidad de registros por página
 * @returns {number} Offset calculado para la consulta
 */
const calcularOffset = (paginaActual, registrosPorPagina) => {
  const paginaActualNormalizada = Math.max(1, parseInt(paginaActual) || 1);
  const registrosPorPaginaNormalizados = Math.max(1, parseInt(registrosPorPagina) || 10);
  return (paginaActualNormalizada - 1) * registrosPorPaginaNormalizados;
};

module.exports = {
  formatearRespuestaPaginada,
  calcularOffset,
};
