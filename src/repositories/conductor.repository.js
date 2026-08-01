const {
  Conductor,
  Usuario,
  Rol,
  EstadoConductor,
} = require("../models");
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

exports.obtenerTodos = async () => {
  return await Conductor.findAll({
    include: [
      usuarioAttr,
      {
        model: EstadoConductor,
        as: "estadoConductor",
        attributes: ["id", "nombre"],
      },
    ],
  });
};

exports.obtenerPorId = async (id) => {
  const conductor = await Conductor.findByPk(id, {
    include: [
      usuarioAttr,
      {
        model: EstadoConductor,
        as: "estadoConductor",
        attributes: ["id", "nombre"],
      },
    ],
  });
  if (!conductor) throw new Error("CONDUCTOR_NO_ENCONTRADO");
  return conductor;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await Conductor.findOne({
    where: { usuarioId },
    include: [
      usuarioAttr,
      {
        model: EstadoConductor,
        as: "estadoConductor",
        attributes: ["id", "nombre"],
      },
    ],
  });
};

exports.crear = async (datos) => {
  return await Conductor.create(datos);
};

exports.actualizar = async (id, datos) => {
  const conductor = await Conductor.findByPk(id);
  if (!conductor) throw new Error("CONDUCTOR_NO_ENCONTRADO");
  return await conductor.update(datos);
};

exports.actualizarEstado = async (id, estadoId) => {
  const conductor = await Conductor.findByPk(id);
  if (!conductor) throw new Error("CONDUCTOR_NO_ENCONTRADO");
  return await conductor.update({ estadoId });
};

exports.eliminar = async (id) => {
  const conductor = await Conductor.findByPk(id);
  if (!conductor) throw new Error("CONDUCTOR_NO_ENCONTRADO");
  await conductor.destroy();
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
      { licenciaConducir: { [Op.like]: `%${q}%` } },
      { "$usuario.nombres$": { [Op.like]: `%${q}%` } },
      { "$usuario.apellidos$": { [Op.like]: `%${q}%` } },
      { "$usuario.correo$": { [Op.like]: `%${q}%` } },
    ];
  }
  return await Conductor.findAndCountAll({
    where,
    include: [
      usuarioAttr,
      {
        model: EstadoConductor,
        as: "estadoConductor",
        attributes: ["id", "nombre"],
      },
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

exports.obtenerExistente = async (usuarioId) => {
  return await Conductor.findOne({ where: { usuarioId } });
};
