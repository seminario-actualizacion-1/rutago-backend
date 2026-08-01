const { Op } = require("sequelize");
const {
  Viaje,
  ViajePasajero,
  Ruta,
  Horario,
  Vehiculo,
  Usuario,
  Rol,
  EstadoViaje,
  Comuna,
  Conductor,
  Pasajero,
} = require("../models");
const { ESTADOS_VIAJE } = require("../config/estados");

const conductorAttr = {
  model: Conductor,
  as: "conductor",
  attributes: ["id", "usuarioId"],
  include: [{
    model: Usuario,
    as: "usuario",
    attributes: ["id", "nombres", "apellidos", "correo", "rolId", "createdAt", "updatedAt"],
    include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }],
  }],
};

const pasajeroAttr = {
  model: Pasajero,
  as: "pasajero",
  attributes: ["id", "usuarioId"],
  include: [{
    model: Usuario,
    as: "usuario",
    attributes: ["id", "nombres", "apellidos", "correo", "rolId", "createdAt", "updatedAt"],
    include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }],
  }],
};

const includeDefault = [
  { model: ViajePasajero, as: "pasajeros", include: [pasajeroAttr] },
  conductorAttr,
  {
    model: Horario,
    as: "horario",
    attributes: ["id", "horaSalida", "frecuenciaMinutos"],
    include: [
      {
        model: Ruta,
        as: "ruta",
        attributes: ["id", "nombre", "distanciaKm", "tiempoEstimadoMinutos", "rutaGeometria"],
        include: [
          { model: Comuna, as: "origen", attributes: ["id", "nombre"] },
          { model: Comuna, as: "destino", attributes: ["id", "nombre"] },
        ],
      },
    ],
  },
  {
    model: Vehiculo,
    as: "vehiculo",
    attributes: ["id", "placa", "capacidadPasajeros"],
  },
  { model: EstadoViaje, as: "estadoViaje", attributes: ["id", "nombre"] },
];

exports.obtenerTodos = async () => {
  return await Viaje.findAll({
    include: includeDefault,
    order: [["createdAt", "DESC"]],
  });
};

exports.obtenerTodosConPaginacion = async (
  limit,
  offset,
  q,
  sortBy = "createdAt",
  sortOrder = "DESC",
  estadoId,
) => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { "$pasajeros.pasajero.usuario.nombres$": { [Op.like]: `%${q}%` } },
      { "$pasajeros.pasajero.usuario.apellidos$": { [Op.like]: `%${q}%` } },
      { "$conductor.usuario.nombres$": { [Op.like]: `%${q}%` } },
      { "$conductor.usuario.apellidos$": { [Op.like]: `%${q}%` } },
      { "$horario.ruta.nombre$": { [Op.like]: `%${q}%` } },
    ];
  }
  if (estadoId) {
    where.estadoId = parseInt(estadoId, 10);
  }
  return await Viaje.findAndCountAll({
    where,
    include: includeDefault,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerPorId = async (id) => {
  const viaje = await Viaje.findByPk(id, {
    include: includeDefault,
  });
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  return viaje;
};

exports.obtenerDisponibles = async () => {
  return await Viaje.findAll({
    where: {
      estadoId: ESTADOS_VIAJE.BUSCANDO,
      conductorId: null,
    },
    include: includeDefault,
    order: [["createdAt", "DESC"]],
  });
};

exports.obtenerDisponiblesPasajero = async (pasajeroId) => {
  const viajesConPasajero = await ViajePasajero.findAll({
    attributes: ["viajeId"],
    where: { pasajeroId },
    raw: true,
  });
  const idsConPasajero = viajesConPasajero.map((v) => v.viajeId);

  const where = {
    estadoId: { [Op.in]: [ESTADOS_VIAJE.BUSCANDO, ESTADOS_VIAJE.ACEPTADO] },
  };
  if (idsConPasajero.length > 0) {
    where.id = { [Op.notIn]: idsConPasajero };
  }

  return await Viaje.findAll({
    where,
    include: includeDefault,
    order: [["createdAt", "DESC"]],
  });
};

exports.obtenerMisViajes = async (usuarioId, esConductor) => {
  const where = esConductor
    ? { "$conductor.usuarioId$": usuarioId }
    : { "$pasajeros.pasajero.usuarioId$": usuarioId };

  return await Viaje.findAll({
    where,
    include: includeDefault,
    order: [["createdAt", "DESC"]],
  });
};

exports.crearViaje = async (datos) => {
  return await Viaje.create({ ...datos, estadoId: ESTADOS_VIAJE.BUSCANDO });
};

exports.agregarPasajero = async (viajeId, pasajeroId) => {
  return await ViajePasajero.create({ viajeId, pasajeroId });
};

exports.eliminarPasajero = async (viajeId, pasajeroId) => {
  return await ViajePasajero.destroy({ where: { viajeId, pasajeroId } });
};

exports.obtenerPorIdSimple = async (id) => {
  return await Viaje.findByPk(id);
};

exports.obtenerEnCursoPorPasajero = async (pasajeroId) => {
  return await Viaje.findOne({
    include: [{
      model: ViajePasajero,
      as: "pasajeros",
      where: { pasajeroId },
      required: true,
      attributes: [],
    }],
    where: { estadoId: ESTADOS_VIAJE.EN_CURSO },
  });
};

exports.obtenerPorConductorYHorario = async (
  conductorId,
  horarioId,
  excludeId,
) => {
  const where = { conductorId, horarioId };
  where.estadoId = {
    [Op.notIn]: [ESTADOS_VIAJE.FINALIZADO, ESTADOS_VIAJE.CANCELADO],
  };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  return await Viaje.findOne({ where });
};

exports.actualizarViaje = async (id, datos) => {
  const viaje = await Viaje.findByPk(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  return await viaje.update(datos);
};

exports.eliminarViaje = async (id) => {
  const viaje = await Viaje.findByPk(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  await ViajePasajero.destroy({ where: { viajeId: id } });
  return await viaje.destroy();
};
