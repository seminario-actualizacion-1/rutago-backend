const comunaRepository = require("../repositories/comuna.repository");

exports.obtenerTodas = async () => {
  return await comunaRepository.obtenerTodas();
};

exports.obtenerPorId = async (id) => {
  return await comunaRepository.obtenerPorId(id);
};

exports.crearComuna = async (datos) => {
  return await comunaRepository.crearComuna(datos);
};

exports.actualizarComuna = async (id, datos) => {
  return await comunaRepository.actualizarComuna(id, datos);
};

exports.eliminarComuna = async (id) => {
  return await comunaRepository.eliminarComuna(id);
};
