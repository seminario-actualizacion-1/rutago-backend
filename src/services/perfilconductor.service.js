const perfilConductorRepository = require("../repositories/perfilconductor.repository");
const { ROLES } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const { ESTADOS_CONDUCTOR } = require("../config/estados");

const ESTADOS_VALIDOS = Object.values(ESTADOS_CONDUCTOR);

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await perfilConductorRepository.obtenerTodosConPaginacion(limit, offset, q, sortBy, sortOrder);

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
  const { usuarioId, vehiculoId, estadoId } = datos;

  const usuario = await perfilConductorRepository.obtenerUsuarioPorId(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== ROLES.CONDUCTOR) throw new Error("EL_USUARIO_NO_ES_CONDUCTOR");

  if (vehiculoId) {
    const vehiculo = await perfilConductorRepository.obtenerVehiculoPorId(vehiculoId);
    if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  if (estadoId && !ESTADOS_VALIDOS.includes(Number(estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  const existente = await perfilConductorRepository.obtenerExistente(usuarioId);
  if (existente) throw new Error("EL_CONDUCTOR_YA_TIENE_PERFIL");

  const datosPermitidos = {
    usuarioId,
    vehiculoId,
    licenciaConducir: datos.licenciaConducir,
    estadoId: estadoId || ESTADOS_CONDUCTOR.DISPONIBLE,
  };

  return await perfilConductorRepository.crearPerfil(datosPermitidos);
};

exports.actualizarPerfil = async (id, datos) => {
  if (datos.vehiculoId) {
    const vehiculo = await perfilConductorRepository.obtenerVehiculoPorId(datos.vehiculoId);
    if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  if (datos.estadoId && !ESTADOS_VALIDOS.includes(Number(datos.estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  return await perfilConductorRepository.actualizarPerfil(id, datos);
};

exports.actualizarMiPerfil = async (usuarioId, datos) => {
  const perfil = await perfilConductorRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) {
    throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  }

  const datosPermitidos = {
    licenciaConducir: datos.licenciaConducir,
    estadoId: datos.estadoId,
  };

  return await perfilConductorRepository.actualizarPerfil(perfil.id, datosPermitidos);
};

exports.actualizarEstado = async (id, estadoId) => {
  if (!ESTADOS_VALIDOS.includes(Number(estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }
  return await perfilConductorRepository.actualizarEstado(id, estadoId);
};

exports.eliminarPerfil = async (id) => {
  return await perfilConductorRepository.eliminarPerfil(id);
};
