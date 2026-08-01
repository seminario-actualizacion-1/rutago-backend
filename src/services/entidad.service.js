const entidadRepository = require("../repositories/entidad.repository");
const usuarioRepository = require("../repositories/usuario.repository");
const { ROLES, NOMBRES_ROL } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const { encriptar } = require("../helpers/encriptarPassword");

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
    await entidadRepository.obtenerTodosConPaginacion(
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
  return await entidadRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  const entidad = await entidadRepository.obtenerPorUsuario(usuarioId);
  if (!entidad) {
    throw new Error("ENTIDAD_NO_ENCONTRADA");
  }
  return entidad;
};

exports.crearEntidad = async (datos) => {
  const { usuarioId, razonSocial } = datos;

  if (!usuarioId || !razonSocial) {
    throw new Error("USUARIO_Y_RAZON_SOCIAL_SON_OBLIGATORIOS");
  }

  const usuario = await entidadRepository.obtenerUsuarioPorId(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (!usuario.rol || usuario.rol.nombreRol !== NOMBRES_ROL[ROLES.ENTIDAD]) {
    throw new Error("EL_USUARIO_NO_ES_ENTIDAD");
  }

  const existente = await entidadRepository.obtenerPorUsuario(usuarioId);
  if (existente) throw new Error("LA_ENTIDAD_YA_TIENE_PERFIL");

  const datosPermitidos = {
    usuarioId,
    razonSocial,
    nit: datos.nit,
    telefonoContacto: datos.telefonoContacto,
  };

  return await entidadRepository.crearEntidad(datosPermitidos);
};

exports.actualizarEntidad = async (id, datos) => {
  return await entidadRepository.actualizarEntidad(id, datos);
};

exports.actualizarMiEntidad = async (usuarioId, datos) => {
  const entidad = await entidadRepository.obtenerPorUsuario(usuarioId);
  if (!entidad) {
    throw new Error("ENTIDAD_NO_ENCONTRADA");
  }

  return await entidadRepository.actualizarEntidad(entidad.id, datos);
};

exports.eliminar = async (id) => {
  return await entidadRepository.eliminar(id);
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
    rolId: ROLES.ENTIDAD,
  });

  const entidad = await entidadRepository.crearEntidad({
    usuarioId: nuevoUsuario.id,
    razonSocial: datosPerfil.razonSocial,
    nit: datosPerfil.nit,
    telefonoContacto: datosPerfil.telefonoContacto,
  });

  return { usuario: nuevoUsuario, entidad };
};
