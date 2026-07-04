const vehiculoRepository = require("../repositories/vehiculo.repository");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

const ESTADOS_VALIDOS_VEHICULO = ["EN_TERMINAL", "EN_RUTA", "PROXIMO"];

const validarVehiculoPayload = async (datos) => {
  const { placa, marca, modelo, color, capacidadPasajeros, entidadId, estado } = datos;

  if (!placa || !marca || !modelo || !color) {
    throw new Error("PLACA_MARCA_MODELO_Y_COLOR_SON_OBLIGATORIOS");
  }

  if (capacidadPasajeros == null || Number(capacidadPasajeros) <= 0) {
    throw new Error("CAPACIDAD_INVALIDA");
  }

  if (estado && !ESTADOS_VALIDOS_VEHICULO.includes(estado)) {
    throw new Error("ESTADO_VEHICULO_INVALIDO");
  }

  if (entidadId) {
    const entidad = await vehiculoRepository.obtenerEntidadPorId(entidadId);
    if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  }
};

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, q, estado, sortBy = "id", sortOrder = "ASC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await vehiculoRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    q,
    estado,
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
  const datosPermitidos = {
    placa: datos.placa,
    marca: datos.marca,
    modelo: datos.modelo,
    color: datos.color,
    capacidadPasajeros: datos.capacidadPasajeros,
    entidadId: datos.entidadId,
    estado: datos.estado,
    latitud: datos.latitud,
    longitud: datos.longitud,
  };
  await validarVehiculoPayload(datosPermitidos);
  return await vehiculoRepository.crearVehiculo(datosPermitidos);
};

exports.actualizarVehiculo = async (id, datos) => {
  const datosPermitidos = {
    placa: datos.placa,
    marca: datos.marca,
    modelo: datos.modelo,
    color: datos.color,
    capacidadPasajeros: datos.capacidadPasajeros,
    entidadId: datos.entidadId,
    estado: datos.estado,
    latitud: datos.latitud,
    longitud: datos.longitud,
  };
  await validarVehiculoPayload(datosPermitidos);
  return await vehiculoRepository.actualizarVehiculo(id, datosPermitidos);
};

exports.eliminarVehiculo = async (id) => {
  return await vehiculoRepository.eliminarVehiculo(id);
};
