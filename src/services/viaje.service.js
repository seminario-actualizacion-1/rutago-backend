const viajeRepository = require("../repositories/viaje.repository");

exports.obtenerTodos = async () => {
  return await viajeRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await viajeRepository.obtenerPorId(id);
};

exports.obtenerMisViajes = async (usuarioId, rolId) => {
  return await viajeRepository.obtenerMisViajes(usuarioId, rolId);
};

exports.crearViaje = async (datos) => {
  return await viajeRepository.crearViaje(datos);
};

exports.actualizarEstado = async (id, nuevoEstado, conductorId) => {
  return await viajeRepository.actualizarEstado(id, nuevoEstado, conductorId);
};
