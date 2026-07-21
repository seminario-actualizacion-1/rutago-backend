const { Op } = require("sequelize");
const { Viaje, Barrio, Usuario, Rol } = require("../models");
const usuarioAttr = (as) => ({ model: Usuario, as, attributes: ["id", "nombres", "apellidos", "correo", "rolId", "createdAt", "updatedAt"], include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }] });

exports.obtenerTodos = async () => {
  return await Viaje.findAll({
    include: [
      usuarioAttr("pasajero"),
      usuarioAttr("conductor"),
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { '$pasajero.nombres$': { [Op.like]: `%${q}%` } },
      { '$pasajero.apellidos$': { [Op.like]: `%${q}%` } },
      { '$conductor.nombres$': { [Op.like]: `%${q}%` } },
      { '$conductor.apellidos$': { [Op.like]: `%${q}%` } },
      { '$barrioOrigen.nombre$': { [Op.like]: `%${q}%` } },
      { '$barrioDestino.nombre$': { [Op.like]: `%${q}%` } },
    ];
  }
  return await Viaje.findAndCountAll({
    where,
    include: [
      usuarioAttr("pasajero"),
      usuarioAttr("conductor"),
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerPorId = async (id) => {
  const viaje = await Viaje.findByPk(id, {
    include: [
      usuarioAttr("pasajero"),
      usuarioAttr("conductor"),
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
  });
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  return viaje;
};

exports.obtenerMisViajes = async (usuarioId, esConductor) => {
  const where = esConductor ? { conductorId: usuarioId } : { pasajeroId: usuarioId };

  return await Viaje.findAll({
    where,
    include: [
      usuarioAttr("pasajero"),
      usuarioAttr("conductor"),
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

exports.crearViaje = async (datos) => {
  return await Viaje.create({ ...datos, estadoId: 1 });
};

exports.obtenerPorIdSimple = async (id) => {
  return await Viaje.findByPk(id);
};

exports.actualizarViaje = async (id, datos) => {
  const viaje = await Viaje.findByPk(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  return await viaje.update(datos);
};
