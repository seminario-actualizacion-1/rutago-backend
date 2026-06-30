const { Usuario, Rol, PerfilConductor, PerfilEntidad } = require("../models");

exports.buscarPorCorreo = async (correo) => {
  return await Usuario.findOne({ where: { correo } });
};

exports.buscarPorId = async (id) => {
  return await Usuario.findByPk(id, {
    include: [
      { model: Rol, as: "rol" },
      { model: PerfilConductor, as: "perfilConductor" },
      { model: PerfilEntidad, as: "perfilEntidad" },
    ],
  });
};

exports.buscarTodos = async () => {
  return await Usuario.findAll({
    include: [
      { model: Rol, as: "rol" },
      { model: PerfilConductor, as: "perfilConductor" },
      { model: PerfilEntidad, as: "perfilEntidad" },
    ],
    order: [["id", "ASC"]],
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

  const rolExiste = await Rol.findByPk(rolId);
  if (!rolExiste) throw new Error("ROL_NO_EXISTE");

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
