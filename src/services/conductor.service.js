const conductorRepository = require("../repositories/conductor.repository");
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

exports.obtenerTodos = async (
  paginaActual = 1,
  registrosPorPagina = 10,
  q,
  sortBy = "createdAt",
  sortOrder = "DESC",
) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await conductorRepository.obtenerTodosConPaginacion(
      limit,
      offset,
      q,
      sortBy,
      sortOrder,
    );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina,
  );
};

exports.obtenerPorId = async (id) => {
  return await conductorRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  const conductor = await conductorRepository.obtenerPorUsuario(usuarioId);
  if (!conductor) {
    throw new Error("CONDUCTOR_NO_ENCONTRADO");
  }
  return conductor;
};

exports.crear = async (datos) => {
  const { usuarioId, estadoId } = datos;

  const usuario =
    await conductorRepository.obtenerUsuarioPorId(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== ROLES.CONDUCTOR)
    throw new Error("EL_USUARIO_NO_ES_CONDUCTOR");

  if (estadoId && !ESTADOS_VALIDOS.includes(Number(estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  const existente = await conductorRepository.obtenerExistente(usuarioId);
  if (existente) throw new Error("EL_CONDUCTOR_YA_TIENE_PERFIL");

  const datosPermitidos = {
    usuarioId,
    licenciaConducir: datos.licenciaConducir,
    estadoId: estadoId || ESTADOS_CONDUCTOR.DISPONIBLE,
  };

  return await conductorRepository.crear(datosPermitidos);
};

exports.actualizar = async (id, datos) => {
  if (datos.estadoId && !ESTADOS_VALIDOS.includes(Number(datos.estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  if (datos.estadoId) {
    const conductor = await conductorRepository.obtenerPorId(id);
    if (conductor) {
      const viajesActivos = await viajeRepository.obtenerMisViajes(
        conductor.usuarioId,
        true,
      );
      const tieneActivo = viajesActivos.some(
        (v) =>
          v.estadoId === ESTADOS_VIAJE.ACEPTADO ||
          v.estadoId === ESTADOS_VIAJE.EN_CURSO,
      );
      if (datos.estadoId === ESTADOS_CONDUCTOR.DISPONIBLE && tieneActivo) {
        throw new Error("CONDUCTOR_TIENE_VIAJE_ACTIVO");
      }
      if (datos.estadoId === ESTADOS_CONDUCTOR.INACTIVO && tieneActivo) {
        throw new Error("CONDUCTOR_TIENE_VIAJE_ACTIVO");
      }
    }
  }

  return await conductorRepository.actualizar(id, datos);
};

exports.actualizarMiPerfil = async (usuarioId, datos) => {
  const conductor = await conductorRepository.obtenerPorUsuario(usuarioId);
  if (!conductor) {
    throw new Error("CONDUCTOR_NO_ENCONTRADO");
  }

  const datosPermitidos = {
    licenciaConducir: datos.licenciaConducir,
    estadoId: datos.estadoId,
  };

  return await conductorRepository.actualizar(
    conductor.id,
    datosPermitidos,
  );
};

exports.actualizarEstado = async (id, estadoId) => {
  if (!ESTADOS_VALIDOS.includes(Number(estadoId))) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }
  return await conductorRepository.actualizarEstado(id, estadoId);
};

exports.eliminar = async (id) => {
  return await conductorRepository.eliminar(id);
};

exports.crearConUsuario = async (datos) => {
  const { datosUsuario, datosPerfil } = datos;

  const usuarioExiste = await usuarioRepository.buscarPorCorreo(
    datosUsuario.correo,
  );
  if (usuarioExiste) throw new Error("EL_CORREO_YA_EXISTE");

  const contrasenaEncriptada = await encriptar(datosUsuario.contrasena);
  const nuevoUsuario = await usuarioRepository.guardarUsuario({
    nombres: datosUsuario.nombres,
    apellidos: datosUsuario.apellidos,
    correo: datosUsuario.correo,
    contrasena: contrasenaEncriptada,
    rolId: ROLES.CONDUCTOR,
  });

  const conductor = await conductorRepository.crear({
    usuarioId: nuevoUsuario.id,
    licenciaConducir: datosPerfil.licenciaConducir,
    estadoId: datosPerfil.estadoId || ESTADOS_CONDUCTOR.DISPONIBLE,
  });

  return { usuario: nuevoUsuario, conductor };
};
