const usuarioRepository = require("../repositories/usuario.repository");
const { Rol } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 1. Función de registro
exports.crearUsuario = async (datosUsuario) => {
  const { nombres, apellidos, correo, contrasena, rolId } = datosUsuario;

  const usuarioExiste = await usuarioRepository.buscarPorCorreo(correo);
  if (usuarioExiste) {
    throw new Error("EL_CORREO_YA_EXISTE");
  }

  const rolExiste = await Rol.findByPk(rolId);
  if (!rolExiste) {
    throw new Error("ROL_NO_EXISTE");
  }

  const salt = await bcrypt.genSalt(10);
  const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

  return await usuarioRepository.guardarUsuario({
    nombres,
    apellidos,
    correo,
    contrasena: contrasenaEncriptada,
    rolId,
  });
};

// 2. Función de autenticación (FUERA de crearUsuario)
exports.autenticarUsuario = async (correo, contrasena) => {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!esValida) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const token = jwt.sign(
    { id: usuario.id, rolId: usuario.rolId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombres: usuario.nombres,
      rolId: usuario.rolId,
    },
  };
};

exports.solicitarRecuperacion = async (correo) => {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");

  // Generar token y expiración (1 hora)
  const token = crypto.randomBytes(20).toString("hex");
  const expira = new Date(Date.now() + 3600000);

  // Guardar en BD (necesitas este método en tu repository)
  await usuarioRepository.actualizarTokenRecuperacion(
    usuario.id,
    token,
    expira,
  );

  return token; // En un sistema real, esto se envía por email
};

exports.cambiarContrasena = async (token, nuevaContrasena) => {
  const usuario = await usuarioRepository.buscarPorToken(token);
  if (!usuario || usuario.resetPasswordExpires < new Date()) {
    throw new Error("TOKEN_INVALIDO_O_EXPIRADO");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(nuevaContrasena, salt);

  await usuarioRepository.actualizarContrasena(usuario.id, hash);
  return true;
};
