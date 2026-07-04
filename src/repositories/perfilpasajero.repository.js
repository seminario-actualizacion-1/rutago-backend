const { Op } = require("sequelize");
const { PerfilPasajero, Usuario } = require("../models");

exports.obtenerTodos = async () => {
  return await PerfilPasajero.findAll({
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.obtenerPorId = async (id) => {
  const perfil = await PerfilPasajero.findByPk(id, {
    include: [{ model: Usuario, as: "usuario" }],
  });
  if (!perfil) throw new Error("PERFIL_PASAJERO_NO_ENCONTRADO");
  return perfil;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await PerfilPasajero.findOne({
    where: { usuarioId },
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.crearPerfil = async (datos) => {
  return await PerfilPasajero.create(datos);
};

exports.actualizarPerfil = async (id, datos) => {
  const perfil = await PerfilPasajero.findByPk(id);
  if (!perfil) throw new Error("PERFIL_PASAJERO_NO_ENCONTRADO");
  return await perfil.update(datos);
};

exports.eliminarPerfil = async (id) => {
  const perfil = await PerfilPasajero.findByPk(id);
  if (!perfil) throw new Error("PERFIL_PASAJERO_NO_ENCONTRADO");
  await perfil.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { numeroDocumento: { [Op.like]: `%${q}%` } },
      { telefono: { [Op.like]: `%${q}%` } },
      { '$usuario.nombres$': { [Op.like]: `%${q}%` } },
      { '$usuario.apellidos$': { [Op.like]: `%${q}%` } },
      { '$usuario.correo$': { [Op.like]: `%${q}%` } },
    ];
  }
  return await PerfilPasajero.findAndCountAll({
    where,
    include: [{ model: Usuario, as: "usuario" }],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id);
};

exports.obtenerExistente = async (usuarioId) => {
  return await PerfilPasajero.findOne({ where: { usuarioId } });
};
