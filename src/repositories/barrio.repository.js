const { Barrio, Comuna } = require("../models");

exports.obtenerTodos = async () => {
  return await Barrio.findAll({ include: [{ model: Comuna, as: "comuna" }] });
};

exports.obtenerPorId = async (id) => {
  const barrio = await Barrio.findByPk(id, {
    include: [{ model: Comuna, as: "comuna" }],
  });
  if (!barrio) throw new Error("BARRIO_NO_ENCONTRADO");
  return barrio;
};

exports.obtenerPorComuna = async (comunaId) => {
  return await Barrio.findAll({
    where: { comunaId },
    include: [{ model: Comuna, as: "comuna" }],
  });
};

exports.crearBarrio = async (datos) => {
  const { comunaId } = datos;
  const comuna = await Comuna.findByPk(comunaId);
  if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  return await Barrio.create(datos);
};

exports.actualizarBarrio = async (id, datos) => {
  const barrio = await Barrio.findByPk(id);
  if (!barrio) throw new Error("BARRIO_NO_ENCONTRADO");

  if (datos.comunaId) {
    const comuna = await Comuna.findByPk(datos.comunaId);
    if (!comuna) throw new Error("COMUNA_NO_ENCONTRADA");
  }

  return await barrio.update(datos);
};

exports.eliminarBarrio = async (id) => {
  const barrio = await Barrio.findByPk(id);
  if (!barrio) throw new Error("BARRIO_NO_ENCONTRADO");
  await barrio.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (limit, offset, filtros = {}) => {
  const where = {};
  if (filtros.comunaId) {
    where.comunaId = Number(filtros.comunaId);
  }
  return await Barrio.findAndCountAll({
    where,
    include: [{ model: Comuna, as: "comuna" }],
    limit,
    offset,
    order: [["nombre", "ASC"]],
    distinct: true,
  });
};
