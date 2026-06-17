const perfilEntidadRepository = require("../repositories/perfilentidad.repository");

exports.obtenerTodos = async () => {
  return await perfilEntidadRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await perfilEntidadRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await perfilEntidadRepository.obtenerPorUsuario(usuarioId);
};

exports.crearEntidad = async (datos) => {
  return await perfilEntidadRepository.crearEntidad(datos);
};

exports.actualizarEntidad = async (id, datos) => {
  return await perfilEntidadRepository.actualizarEntidad(id, datos);
};

exports.eliminarEntidad = async (id) => {
  return await perfilEntidadRepository.eliminarEntidad(id);
};
