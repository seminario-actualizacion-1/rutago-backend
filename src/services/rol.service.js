const rolRepository = require("../repositories/rol.repository");

exports.obtenerTodos = async () => {
  return await rolRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await rolRepository.obtenerPorId(id);
};
