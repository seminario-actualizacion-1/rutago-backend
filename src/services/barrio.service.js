const barrioRepository = require("../repositories/barrio.repository");

exports.obtenerTodos = async () => {
  return await barrioRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await barrioRepository.obtenerPorId(id);
};

exports.obtenerPorComuna = async (comunaId) => {
  return await barrioRepository.obtenerPorComuna(comunaId);
};

exports.crearBarrio = async (datos) => {
  return await barrioRepository.crearBarrio(datos);
};

exports.actualizarBarrio = async (id, datos) => {
  return await barrioRepository.actualizarBarrio(id, datos);
};

exports.eliminarBarrio = async (id) => {
  return await barrioRepository.eliminarBarrio(id);
};
