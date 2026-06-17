const { Rol } = require("../models");

exports.obtenerTodos = async () => {
  return await Rol.findAll();
};

exports.obtenerPorId = async (id) => {
  const rol = await Rol.findByPk(id);
  if (!rol) throw new Error("ROL_NO_ENCONTRADO");
  return rol;
};
