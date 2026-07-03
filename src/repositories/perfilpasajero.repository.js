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
  const { usuarioId } = datos;

  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== 3) throw new Error("EL_USUARIO_NO_ES_PASAJERO");

  const existente = await PerfilPasajero.findOne({ where: { usuarioId } });
  if (existente) throw new Error("EL_PASAJERO_YA_TIENE_PERFIL");

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

exports.obtenerTodosConPaginacion = async (limit, offset) => {
  return await PerfilPasajero.findAndCountAll({
    include: [{ model: Usuario, as: "usuario" }],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });
};
