const vehiculoRepository = require("../repositories/vehiculo.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await vehiculoRepository.obtenerTodosConPaginacion(
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
  const vehiculo = await vehiculoRepository.obtenerPorId(id);
  if (!vehiculo) {
    throw new Error("VEHICULO_NO_ENCONTRADO");
  }
  return vehiculo;
};

exports.obtenerUbicacion = async (id) => {
  const vehiculo = await vehiculoRepository.obtenerPorId(id);
  return {
    id: vehiculo.id,
    placa: vehiculo.placa,
    estado: vehiculo.estado,
    latitud: vehiculo.latitud,
    longitud: vehiculo.longitud,
    ultimaActualizacion: vehiculo.ultimaActualizacion,
  };
};

exports.actualizarUbicacion = async (id, datos) => {
  const { latitud, longitud, estado } = datos;
  return await vehiculoRepository.actualizarVehiculo(id, {
    latitud,
    longitud,
    estado,
    ultimaActualizacion: new Date(),
  });
};

exports.crearVehiculo = async (datos) => {
  return await vehiculoRepository.crearVehiculo(datos);
};

exports.actualizarVehiculo = async (id, datos) => {
  return await vehiculoRepository.actualizarVehiculo(id, datos);
};

exports.eliminarVehiculo = async (id) => {
  return await vehiculoRepository.eliminarVehiculo(id);
};
