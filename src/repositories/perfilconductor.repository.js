const { Op } = require("sequelize");
const { PerfilConductor, Vehiculo, Usuario, Rol } = require("../models");
const usuarioAttr = { model: Usuario, as: "usuario", attributes: ["id", "nombres", "apellidos", "correo", "rolId", "createdAt", "updatedAt"], include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }] };

exports.obtenerTodos = async () => {
  return await PerfilConductor.findAll({
    include: [
      usuarioAttr,
      { model: Vehiculo, as: "vehiculo" },
    ],
  });
};

exports.obtenerPorId = async (id) => {
  const perfil = await PerfilConductor.findByPk(id, {
    include: [
      usuarioAttr,
      { model: Vehiculo, as: "vehiculo" },
    ],
  });
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  return perfil;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await PerfilConductor.findOne({
    where: { usuarioId },
    include: [
      usuarioAttr,
      { model: Vehiculo, as: "vehiculo" },
    ],
  });
};

exports.crearPerfil = async (datos) => {
  return await PerfilConductor.create(datos);
};

exports.actualizarPerfil = async (id, datos) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  return await perfil.update(datos);
};

exports.actualizarEstado = async (id, estadoId) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  return await perfil.update({ estadoId });
};

exports.eliminarPerfil = async (id) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  await perfil.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { licenciaConducir: { [Op.like]: `%${q}%` } },
      { '$usuario.nombres$': { [Op.like]: `%${q}%` } },
      { '$usuario.apellidos$': { [Op.like]: `%${q}%` } },
      { '$usuario.correo$': { [Op.like]: `%${q}%` } },
    ];
  }
  return await PerfilConductor.findAndCountAll({
    where,
    include: [
      usuarioAttr,
      { model: Vehiculo, as: "vehiculo" },
    ],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerUsuarioPorId = async (id) => {
  return await require("../models").Usuario.findByPk(id);
};

exports.obtenerVehiculoPorId = async (id) => {
  return await Vehiculo.findByPk(id);
};

exports.obtenerExistente = async (usuarioId) => {
  return await PerfilConductor.findOne({ where: { usuarioId } });
};
