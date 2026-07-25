const usuarioRepository = require("../repositories/usuario.repository");
const rolRepository = require("../repositories/rol.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generarToken, generarRefreshToken } = require("../helpers/generarToken");

exports.autenticarUsuario = async (correo, contrasena) => {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) throw new Error("CREDENCIALES_INVALIDAS");

  const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!esValida) throw new Error("CREDENCIALES_INVALIDAS");

  const token = generarToken(usuario);
  const refreshToken = generarRefreshToken(usuario);
  const rol = await rolRepository.obtenerPorId(usuario.rolId);

  return {
    token,
    refreshToken,
    usuario: {
      id: usuario.id,
      nombres: usuario.nombres,
      rol: rol ? { id: rol.id, nombreRol: rol.nombreRol } : null,
    },
  };
};

exports.refrescarToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (decoded.type !== "refresh") throw new Error("REFRESH_INVALIDO");
    const usuario = await usuarioRepository.obtenerPorId(decoded.id);
    if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");
    return { token: generarToken(usuario), refreshToken: generarRefreshToken(usuario) };
  } catch (err) {
    throw new Error("REFRESH_INVALIDO");
  }
};
