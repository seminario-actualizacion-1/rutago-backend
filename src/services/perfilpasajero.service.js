const perfilPasajeroRepository = require("../repositories/perfilpasajero.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } =
    await perfilPasajeroRepository.obtenerTodosConPaginacion(limit, offset);

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
  return await perfilPasajeroRepository.crearPerfil(datos);
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
    tipoDocumento: datos.tipoDocumento,
    numeroDocumento: datos.numeroDocumento,
    fechaNacimiento: datos.fechaNacimiento,
  };

  return await perfilPasajeroRepository.actualizarPerfil(
    perfil.id,
    datosPermitidos,
  );
};

exports.eliminarPerfil = async (id) => {
  return await perfilPasajeroRepository.eliminarPerfil(id);
};
