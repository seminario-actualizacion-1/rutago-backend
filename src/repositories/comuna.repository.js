const { Comuna } = require("../models");

exports.obtenerTodas = async () => {
  return await Comuna.findAll();
};

exports.obtenerPorId = async (id) => {
  const comuna = await Comuna.findByPk(id);
  if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  return comuna;
};

exports.crearComuna = async (datos) => {
  return await Comuna.create(datos);
};

exports.actualizarComuna = async (id, datos) => {
  const comuna = await Comuna.findByPk(id);
  if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  return await comuna.update(datos);
};

exports.eliminarComuna = async (id) => {
  const comuna = await Comuna.findByPk(id);
  if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  await comuna.destroy();
  return true;
};

exports.obtenerTodasConPaginacion = async (limit, offset) => {
  return await Comuna.findAndCountAll({
    limit,
    offset,
    order: [["nombre", "ASC"]],
    distinct: true,
  });
};
