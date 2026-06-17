const { Viaje, Usuario, Barrio, PerfilConductor } = require("../models");

exports.obtenerTodos = async () => {
  return await Viaje.findAll({
    include: [
      { model: Usuario, as: "pasajero" },
      { model: Usuario, as: "conductor" },
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

exports.obtenerPorId = async (id) => {
  const viaje = await Viaje.findByPk(id, {
    include: [
      { model: Usuario, as: "pasajero" },
      { model: Usuario, as: "conductor" },
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
  });
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  return viaje;
};

exports.obtenerMisViajes = async (usuarioId, rolId) => {
  const where =
    rolId === 2 ? { conductorId: usuarioId } : { pasajeroId: usuarioId };

  return await Viaje.findAll({
    where,
    include: [
      { model: Usuario, as: "pasajero" },
      { model: Usuario, as: "conductor" },
      { model: Barrio, as: "barrioOrigen" },
      { model: Barrio, as: "barrioDestino" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

exports.crearViaje = async (datos) => {
  const { pasajeroId, barrioOrigenId, barrioDestinoId } = datos;

  const pasajero = await Usuario.findByPk(pasajeroId);
  if (!pasajero) throw new Error("PASAJERO_NO_ENCONTRADO");
  if (pasajero.rolId !== 3) throw new Error("EL_USUARIO_NO_ES_PASAJERO");

  const origen = await Barrio.findByPk(barrioOrigenId);
  if (!origen) throw new Error("BARRIO_ORIGEN_NO_ENCONTRADO");

  const destino = await Barrio.findByPk(barrioDestinoId);
  if (!destino) throw new Error("BARRIO_DESTINO_NO_ENCONTRADO");

  return await Viaje.create({ ...datos, estado: "BUSCANDO" });
};

exports.actualizarEstado = async (id, nuevoEstado, conductorId = null) => {
  const viaje = await Viaje.findByPk(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");

  if (nuevoEstado === "ACEPTADO") {
    if (!conductorId) throw new Error("SE_REQUIERE_CONDUCTOR");
    const perfil = await PerfilConductor.findOne({
      where: { usuarioId: conductorId },
    });
    if (!perfil) throw new Error("CONDUCTOR_SIN_PERFIL");
    if (perfil.estado !== "DISPONIBLE")
      throw new Error("CONDUCTOR_NO_DISPONIBLE");
    return await viaje.update({ estado: nuevoEstado, conductorId });
  }

  if (
    nuevoEstado === "EN_CURSO" ||
    nuevoEstado === "FINALIZADO" ||
    nuevoEstado === "CANCELADO"
  ) {
    return await viaje.update({ estado: nuevoEstado });
  }

  throw new Error("ESTADO_NO_VALIDO");
};
