const { Op } = require("sequelize");
const { Pasajero, Usuario, Rol, TipoDocumento } = require("../models");
const usuarioAttr = {
  model: Usuario,
  as: "usuario",
  attributes: [
    "id",
    "nombres",
    "apellidos",
    "correo",
    "rolId",
    "createdAt",
    "updatedAt",
  ],
  include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }],
};
const includePasajero = [
  usuarioAttr,
  { model: TipoDocumento, as: "tipoDocumento" },
];

exports.obtenerTodos = async () => {
  return await Pasajero.findAll({
    include: includePasajero,
  });
};

exports.obtenerPorId = async (id) => {
  const pasajero = await Pasajero.findByPk(id, {
    include: includePasajero,
  });
  if (!pasajero) throw new Error("PASAJERO_NO_ENCONTRADO");
  return pasajero;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await Pasajero.findOne({
    where: { usuarioId },
    include: includePasajero,
  });
};

exports.crear = async (datos) => {
  return await Pasajero.create(datos);
};

exports.actualizar = async (id, datos) => {
  const pasajero = await Pasajero.findByPk(id);
  if (!pasajero) throw new Error("PASAJERO_NO_ENCONTRADO");
  return await pasajero.update(datos);
};

exports.eliminar = async (id) => {
  const pasajero = await Pasajero.findByPk(id);
  if (!pasajero) throw new Error("PASAJERO_NO_ENCONTRADO");
  await pasajero.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (
  limit,
  offset,
  q,
  sortBy = "createdAt",
  sortOrder = "DESC",
) => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { numeroDocumento: { [Op.like]: `%${q}%` } },
      { telefono: { [Op.like]: `%${q}%` } },
      { "$usuario.nombres$": { [Op.like]: `%${q}%` } },
      { "$usuario.apellidos$": { [Op.like]: `%${q}%` } },
      { "$usuario.correo$": { [Op.like]: `%${q}%` } },
    ];
  }
  return await Pasajero.findAndCountAll({
    where,
    include: includePasajero,
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
  return await Pasajero.findOne({ where: { usuarioId } });
};
