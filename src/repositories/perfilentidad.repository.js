const { PerfilEntidad, Usuario } = require("../models");

exports.obtenerTodos = async () => {
  return await PerfilEntidad.findAll({
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.obtenerPorId = async (id) => {
  const entidad = await PerfilEntidad.findByPk(id, {
    include: [{ model: Usuario, as: "usuario" }],
  });
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  return entidad;
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await PerfilEntidad.findOne({
    where: { usuarioId },
    include: [{ model: Usuario, as: "usuario" }],
  });
};

exports.crearEntidad = async (datos) => {
  const { usuarioId } = datos;

  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  if (usuario.rolId !== 4) throw new Error("EL_USUARIO_NO_ES_ENTIDAD");

  const existente = await PerfilEntidad.findOne({ where: { usuarioId } });
  if (existente) throw new Error("LA_ENTIDAD_YA_TIENE_PERFIL");

  return await PerfilEntidad.create(datos);
};

exports.actualizarEntidad = async (id, datos) => {
  const entidad = await PerfilEntidad.findByPk(id);
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  return await entidad.update(datos);
};

exports.eliminarEntidad = async (id) => {
  const entidad = await PerfilEntidad.findByPk(id);
  if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  await entidad.destroy();
  return true;
};
