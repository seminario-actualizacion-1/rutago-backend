const perfilEntidadRepository = require("../repositories/perfilentidad.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await perfilEntidadRepository.obtenerTodosConPaginacion(limit, offset);

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await perfilEntidadRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  const entidad = await perfilEntidadRepository.obtenerPorUsuario(usuarioId);
  if (!entidad) {
    throw new Error("ENTIDAD_NO_ENCONTRADA");
  }
  return entidad;
};

exports.crearEntidad = async (datos) => {
  return await perfilEntidadRepository.crearEntidad(datos);
};

exports.actualizarEntidad = async (id, datos) => {
  return await perfilEntidadRepository.actualizarEntidad(id, datos);
};

exports.actualizarMiEntidad = async (usuarioId, datos) => {
  const entidad = await perfilEntidadRepository.obtenerPorUsuario(usuarioId);
  if (!entidad) {
    throw new Error("ENTIDAD_NO_ENCONTRADA");
  }

  return await perfilEntidadRepository.actualizarEntidad(entidad.id, datos);
};

exports.eliminarEntidad = async (id) => {
  return await perfilEntidadRepository.eliminarEntidad(id);
};
