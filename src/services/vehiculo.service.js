const vehiculoRepository = require("../repositories/vehiculo.repository");

exports.obtenerTodos = async () => {
  return await vehiculoRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await vehiculoRepository.obtenerPorId(id);
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
