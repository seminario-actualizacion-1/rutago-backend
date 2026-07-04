const { Usuario, Rol, PerfilConductor, PerfilEntidad, PerfilPasajero } = require("../models");
const { Op } = require("sequelize");

exports.buscarPorCorreo = async (correo) => {
  return await Usuario.findOne({ where: { correo } });
};

exports.buscarPorId = async (id) => {
  return await Usuario.findByPk(id, {
    include: [
      { model: Rol, as: "rol" },
      { model: PerfilConductor, as: "perfilConductor" },
      { model: PerfilEntidad, as: "perfilEntidad" },
      { model: PerfilPasajero, as: "perfilPasajero" },
    ],
  });
};

exports.buscarTodos = async () => {
  return await Usuario.findAll({
    include: [
      { model: Rol, as: "rol" },
      { model: PerfilConductor, as: "perfilConductor" },
      { model: PerfilEntidad, as: "perfilEntidad" },
      { model: PerfilPasajero, as: "perfilPasajero" },
    ],
    order: [["id", "ASC"]],
  });
};

exports.buscarTodosConPaginacion = async (limit, offset, filtros = {}, sortBy = "id", sortOrder = "ASC") => {
  const where = {};

  if (filtros.rolId) {
    where.rolId = Number(filtros.rolId);
  }

  if (filtros.correo) {
    where.correo = { [Op.like]: `%${filtros.correo}%` };
  }

  if (filtros.q) {
    where[Op.or] = [
      { nombres: { [Op.like]: `%${filtros.q}%` } },
      { apellidos: { [Op.like]: `%${filtros.q}%` } },
      { correo: { [Op.like]: `%${filtros.q}%` } },
    ];
  }

  return await Usuario.findAndCountAll({
    where,
    include: [
      { model: Rol, as: "rol" },
      { model: PerfilConductor, as: "perfilConductor" },
      { model: PerfilEntidad, as: "perfilEntidad" },
      { model: PerfilPasajero, as: "perfilPasajero" },
    ],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.guardarUsuario = async (datosUsuario) => {
  return await Usuario.create(datosUsuario);
};

exports.actualizarDatos = async (id, datos) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  return await usuario.update(datos);
};

exports.actualizarRol = async (id, rolId) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  return await usuario.update({ rolId });
};

exports.eliminarUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
  await usuario.destroy();
  return true;
};

exports.actualizarTokenRecuperacion = async (id, token, expira) => {
  return await Usuario.update(
    { resetPasswordToken: token, resetPasswordExpires: expira },
    { where: { id } },
  );
};

exports.buscarPorToken = async (token) => {
  return await Usuario.findOne({ where: { resetPasswordToken: token } });
};

exports.actualizarContrasena = async (id, nuevaContrasena) => {
  return await Usuario.update(
    {
      contrasena: nuevaContrasena,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    { where: { id } },
  );
};
