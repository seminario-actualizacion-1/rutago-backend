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
} = require("../models");
const { ESTADOS_VIAJE } = require("../config/estados");

const usuarioAttr = (as) => ({
  model: Usuario,
  as,
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
});

const includeDefault = [
  { model: ViajePasajero, as: "pasajeros", include: [usuarioAttr("pasajero")] },
  usuarioAttr("conductor"),
  {
    model: Ruta,
    as: "ruta",
    attributes: [
      "id",
      "nombre",
      "distanciaKm",
      "tiempoEstimadoMinutos",
      "rutaGeometria",
    ],
    include: [
      { model: Comuna, as: "origen", attributes: ["id", "nombre"] },
      { model: Comuna, as: "destino", attributes: ["id", "nombre"] },
    ],
  },
  {
    model: Horario,
    as: "horario",
    attributes: ["id", "horaSalida", "frecuenciaMinutos"],
    include: [
      {
        model: Vehiculo,
        as: "vehiculo",
        attributes: ["id", "placa", "capacidadPasajeros"],
      },
    ],
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
      { "$pasajeros.pasajero.nombres$": { [Op.like]: `%${q}%` } },
      { "$pasajeros.pasajero.apellidos$": { [Op.like]: `%${q}%` } },
      { "$conductor.nombres$": { [Op.like]: `%${q}%` } },
      { "$conductor.apellidos$": { [Op.like]: `%${q}%` } },
      { "$ruta.nombre$": { [Op.like]: `%${q}%` } },
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

exports.obtenerDisponibles = async (conductorId) => {
  const where = {
    estadoId: { [Op.in]: [ESTADOS_VIAJE.BUSCANDO, ESTADOS_VIAJE.ACEPTADO] },
  };
  if (conductorId) {
    where[Op.and] = [
      {
        [Op.or]: [
          { conductorId: null },
          { conductorId: { [Op.ne]: conductorId } },
        ],
      },
    ];
  }
  return await Viaje.findAll({
    where,
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
    ? { conductorId: usuarioId }
    : { "$pasajeros.pasajeroId$": usuarioId };

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

exports.obtenerPorConductorYHorario = async (conductorId, horarioId) => {
  return await Viaje.findOne({
    where: {
      conductorId,
      horarioId,
      estadoId: {
        [Op.notIn]: [ESTADOS_VIAJE.FINALIZADO, ESTADOS_VIAJE.CANCELADO],
      },
    },
  });
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
