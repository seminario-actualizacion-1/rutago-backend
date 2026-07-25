const perfilPasajeroRepository = require("../repositories/perfilpasajero.repository");
const usuarioRepository = require("../repositories/usuario.repository");
const { ROLES } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const { encriptar } = require("../helpers/encriptarPassword");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await perfilPasajeroRepository.obtenerTodosConPaginacion(limit, offset, q, sortBy, sortOrder);

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await perfilPasajeroRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  const perfil = await perfilPasajeroRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) throw new Error("PERFIL_PASAJERO_NO_ENCONTRADO");
  return perfil;
};

exports.crearPerfil = async (datos) => {
  const { usuarioId } = datos;

  const usuario = await perfilPasajeroRepository.obtenerUsuarioPorId(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== ROLES.PASAJERO) throw new Error("EL_USUARIO_NO_ES_PASAJERO");

  const existente = await perfilPasajeroRepository.obtenerExistente(usuarioId);
  if (existente) throw new Error("EL_PASAJERO_YA_TIENE_PERFIL");

  const datosPermitidos = {
    usuarioId,
    telefono: datos.telefono,
    direccion: datos.direccion,
    tipoDocumentoId: datos.tipoDocumentoId,
    numeroDocumento: datos.numeroDocumento,
    fechaNacimiento: datos.fechaNacimiento,
  };

  return await perfilPasajeroRepository.crearPerfil(datosPermitidos);
};

exports.actualizarPerfil = async (id, datos) => {
  return await perfilPasajeroRepository.actualizarPerfil(id, datos);
};

exports.actualizarMiPerfil = async (usuarioId, datos) => {
  const perfil = await perfilPasajeroRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) throw new Error("PERFIL_PASAJERO_NO_ENCONTRADO");

  const datosPermitidos = {
    telefono: datos.telefono,
    direccion: datos.direccion,
    tipoDocumentoId: datos.tipoDocumentoId,
    numeroDocumento: datos.numeroDocumento,
    fechaNacimiento: datos.fechaNacimiento,
  };

  return await perfilPasajeroRepository.actualizarPerfil(perfil.id, datosPermitidos);
};

exports.eliminarPerfil = async (id) => {
  return await perfilPasajeroRepository.eliminarPerfil(id);
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
    rolId: ROLES.PASAJERO,
  });

  const perfil = await perfilPasajeroRepository.crearPerfil({
    usuarioId: nuevoUsuario.id,
    telefono: datosPerfil.telefono,
    direccion: datosPerfil.direccion,
    tipoDocumentoId: datosPerfil.tipoDocumentoId,
    numeroDocumento: datosPerfil.numeroDocumento,
    fechaNacimiento: datosPerfil.fechaNacimiento,
  });

  return { usuario: nuevoUsuario, perfil };
};
