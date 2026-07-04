const rutaRepository = require("../repositories/ruta.repository");
const comunaRepository = require("../repositories/comuna.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodas = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "id", sortOrder = "ASC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await rutaRepository.obtenerTodasConPaginacion(
    limit,
    offset,
    q,
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
  return await rutaRepository.obtenerPorId(id);
};

exports.buscarPorDestino = async (destino) => {
  return await rutaRepository.buscarPorDestino(destino);
};

exports.crearRuta = async (datos) => {
  const { nombre, origenId, destinoId } = datos;

  if (!nombre || !origenId || !destinoId) {
    throw new Error("NOMBRE_ORIGEN_Y_DESTINO_SON_OBLIGATORIOS");
  }

  if (Number(origenId) === Number(destinoId)) {
    throw new Error("ORIGEN_Y_DESTINO_NO_PUEDEN_SER_IGUALES");
  }

  const origen = await comunaRepository.obtenerPorId(origenId);
  if (!origen) {
    throw new Error("COMUNA_ORIGEN_NO_ENCONTRADA");
  }

  const destino = await comunaRepository.obtenerPorId(destinoId);
  if (!destino) {
    throw new Error("COMUNA_DESTINO_NO_ENCONTRADA");
  }

  return await rutaRepository.crearRuta(datos);
};

exports.actualizarRuta = async (id, datos) => {
  const { nombre, origenId, destinoId } = datos;

  if (!nombre || !origenId || !destinoId) {
    throw new Error("NOMBRE_ORIGEN_Y_DESTINO_SON_OBLIGATORIOS");
  }

  if (Number(origenId) === Number(destinoId)) {
    throw new Error("ORIGEN_Y_DESTINO_NO_PUEDEN_SER_IGUALES");
  }

  const origen = await comunaRepository.obtenerPorId(origenId);
  if (!origen) {
    throw new Error("COMUNA_ORIGEN_NO_ENCONTRADA");
  }

  const destino = await comunaRepository.obtenerPorId(destinoId);
  if (!destino) {
    throw new Error("COMUNA_DESTINO_NO_ENCONTRADA");
  }

  return await rutaRepository.actualizarRuta(id, datos);
};

exports.eliminarRuta = async (id) => {
  return await rutaRepository.eliminarRuta(id);
};
