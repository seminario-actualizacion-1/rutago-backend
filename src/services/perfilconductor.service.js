const perfilConductorRepository = require("../repositories/perfilconductor.repository");
const usuarioRepository = require("../repositories/usuario.repository");
const viajeRepository = require("../repositories/viaje.repository");
const { ROLES } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const { encriptar } = require("../helpers/encriptarPassword");
const { ESTADOS_CONDUCTOR, ESTADOS_VIAJE } = require("../config/estados");

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

  if (datos.estadoId) {
    const perfil = await perfilConductorRepository.obtenerPorId(id);
    if (perfil) {
      const viajesActivos = await viajeRepository.obtenerMisViajes(perfil.usuarioId, true);
      const tieneActivo = viajesActivos.some((v) =>
        v.estadoId === ESTADOS_VIAJE.ACEPTADO || v.estadoId === ESTADOS_VIAJE.EN_CURSO
      );
      if (datos.estadoId === ESTADOS_CONDUCTOR.DISPONIBLE && tieneActivo) {
        throw new Error("CONDUCTOR_TIENE_VIAJE_ACTIVO");
      }
      if (datos.estadoId === ESTADOS_CONDUCTOR.INACTIVO && tieneActivo) {
        throw new Error("CONDUCTOR_TIENE_VIAJE_ACTIVO");
      }
    }
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

exports.crearConUsuario = async (datos) => {
  const { datosUsuario, datosPerfil } = datos;

  const usuarioExiste = await usuarioRepository.buscarPorCorreo(datosUsuario.correo);
  if (usuarioExiste) throw new Error("EL_CORREO_YA_EXISTE");

  const contrasenaEncriptada = await encriptar(datosUsuario.contrasena);
  const nuevoUsuario = await usuarioRepository.guardarUsuario({
    nombres: datosUsuario.nombres,
    apellidos: datosUsuario.apellidos,
    correo: datosUsuario.correo,
    contrasena: contrasenaEncriptada,
    rolId: ROLES.CONDUCTOR,
  });

  const perfil = await perfilConductorRepository.crearPerfil({
    usuarioId: nuevoUsuario.id,
    vehiculoId: datosPerfil.vehiculoId,
    licenciaConducir: datosPerfil.licenciaConducir,
    estadoId: datosPerfil.estadoId || ESTADOS_CONDUCTOR.DISPONIBLE,
  });

  return { usuario: nuevoUsuario, perfil };
};
