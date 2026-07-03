const perfilConductorRepository = require("../repositories/perfilconductor.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await perfilConductorRepository.obtenerTodosConPaginacion(limit, offset);

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await perfilConductorRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  const perfil = await perfilConductorRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) {
    throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  }
  return perfil;
};

exports.crearPerfil = async (datos) => {
  return await perfilConductorRepository.crearPerfil(datos);
};

exports.actualizarPerfil = async (id, datos) => {
  return await perfilConductorRepository.actualizarPerfil(id, datos);
};

exports.actualizarMiPerfil = async (usuarioId, datos) => {
  const perfil = await perfilConductorRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) {
    throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  }

  const datosPermitidos = {
    licenciaConducir: datos.licenciaConducir,
    estado: datos.estado,
  };

  return await perfilConductorRepository.actualizarPerfil(
    perfil.id,
    datosPermitidos,
  );
};

exports.actualizarEstado = async (id, estado) => {
  return await perfilConductorRepository.actualizarEstado(id, estado);
};

exports.eliminarPerfil = async (id) => {
  return await perfilConductorRepository.eliminarPerfil(id);
};
