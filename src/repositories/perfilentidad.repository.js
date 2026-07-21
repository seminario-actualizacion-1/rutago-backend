const { Op } = require("sequelize");
const { PerfilEntidad, Usuario, Rol } = require("../models");
const usuarioAttr = { model: Usuario, as: "usuario", attributes: ["id", "nombres", "apellidos", "correo", "rolId", "createdAt", "updatedAt"], include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }] };

exports.obtenerTodos = async () => {
  return await PerfilEntidad.findAll({
    include: [usuarioAttr],
  });
};

exports.obtenerPorId = async (id) => {
  const entidad = await PerfilEntidad.findByPk(id, {
    include: [usuarioAttr],
  });
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  return entidad;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await PerfilEntidad.findOne({
    where: { usuarioId },
    include: [usuarioAttr],
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
    include: [usuarioAttr],
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
