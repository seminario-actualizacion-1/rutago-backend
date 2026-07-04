const { Op } = require("sequelize");
const { PerfilEntidad, Usuario } = require("../models");

exports.obtenerTodos = async () => {
  return await PerfilEntidad.findAll({
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.obtenerPorId = async (id) => {
  const entidad = await PerfilEntidad.findByPk(id, {
    include: [{ model: Usuario, as: "usuario" }],
  });
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  return entidad;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await PerfilEntidad.findOne({
    where: { usuarioId },
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.crearEntidad = async (datos) => {
  return await PerfilEntidad.create(datos);
};

exports.actualizarEntidad = async (id, datos) => {
  const entidad = await PerfilEntidad.findByPk(id);
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  return await entidad.update(datos);
};

exports.eliminarEntidad = async (id) => {
  const entidad = await PerfilEntidad.findByPk(id);
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  await entidad.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { razonSocial: { [Op.like]: `%${q}%` } },
      { nit: { [Op.like]: `%${q}%` } },
      { telefonoContacto: { [Op.like]: `%${q}%` } },
      { '$usuario.nombres$': { [Op.like]: `%${q}%` } },
      { '$usuario.correo$': { [Op.like]: `%${q}%` } },
    ];
  }
  return await PerfilEntidad.findAndCountAll({
    where,
    include: [{ model: Usuario, as: "usuario" }],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id, {
    include: [{ association: "rol" }],
  });
};
