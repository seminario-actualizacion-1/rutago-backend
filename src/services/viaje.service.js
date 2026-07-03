const viajeRepository = require("../repositories/viaje.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await viajeRepository.obtenerTodosConPaginacion(
    limit,
    offset
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await viajeRepository.obtenerPorId(id);
};

exports.obtenerMisViajes = async (usuarioId, rolId) => {
  return await viajeRepository.obtenerMisViajes(usuarioId, rolId);
};

exports.crearViaje = async (datos) => {
  // Validación B04.1: No se puede solicitar un viaje a sí mismo
  if (datos.conductorId && datos.pasajeroId === datos.conductorId) {
    throw new Error("NO_PUEDE_SOLICITAR_VIAJE_A_SI_MISMO");
  }

  // Validación B04.2: El precio estimado debe ser mayor a 0
  if (datos.precioEstimado !== undefined && datos.precioEstimado !== null) {
    const precio = parseFloat(datos.precioEstimado);
    if (isNaN(precio) || precio <= 0) {
      throw new Error("PRECIO_DEBE_SER_MAYOR_A_CERO");
    }
    datos.precioEstimado = precio;
  }

  // Validación B04.3: Los barrios deben existir (se valida en el repositorio)
  // Esta validación ya está implementada en viaje.repository.js

  return await viajeRepository.crearViaje(datos);
};

exports.actualizarEstado = async (id, nuevoEstado, conductorId) => {
  return await viajeRepository.actualizarEstado(id, nuevoEstado, conductorId);
};
