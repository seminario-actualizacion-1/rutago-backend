const { PerfilConductor, Usuario, Vehiculo } = require("../models");

const ESTADOS_VALIDOS = ["DISPONIBLE", "EN_VIAJE", "INACTIVO"];

exports.obtenerTodos = async () => {
  return await PerfilConductor.findAll({
    include: [
      { model: Usuario, as: "usuario" },
      { model: Vehiculo, as: "vehiculo" },
    ],
  });
};

exports.obtenerPorId = async (id) => {
  const perfil = await PerfilConductor.findByPk(id, {
    include: [
      { model: Usuario, as: "usuario" },
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
      { model: Usuario, as: "usuario" },
      { model: Vehiculo, as: "vehiculo" },
    ],
  });
};

exports.crearPerfil = async (datos) => {
  const { usuarioId, vehiculoId, estado } = datos;

  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== 2) throw new Error("EL_USUARIO_NO_ES_CONDUCTOR");

  if (vehiculoId) {
    const vehiculo = await Vehiculo.findByPk(vehiculoId);
    if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  const existente = await PerfilConductor.findOne({ where: { usuarioId } });
  if (existente) throw new Error("EL_CONDUCTOR_YA_TIENE_PERFIL");

  return await PerfilConductor.create({
    ...datos,
    estado: estado || "DISPONIBLE",
  });
};

exports.actualizarPerfil = async (id, datos) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");

  if (datos.vehiculoId) {
    const vehiculo = await Vehiculo.findByPk(datos.vehiculoId);
    if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  }

  if (datos.estado && !ESTADOS_VALIDOS.includes(datos.estado)) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }

  return await perfil.update(datos);
};

exports.actualizarEstado = async (id, estado) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  if (!ESTADOS_VALIDOS.includes(estado)) {
    throw new Error("ESTADO_CONDUCTOR_INVALIDO");
  }
  return await perfil.update({ estado });
};

exports.eliminarPerfil = async (id) => {
  const perfil = await PerfilConductor.findByPk(id);
  if (!perfil) throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  await perfil.destroy();
  return true;
};

exports.obtenerTodosConPaginacion = async (limit, offset) => {
  return await PerfilConductor.findAndCountAll({
    include: [
      { model: Usuario, as: "usuario" },
      { model: Vehiculo, as: "vehiculo" },
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });
};
