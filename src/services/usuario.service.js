const usuarioRepository = require("../repositories/usuario.repository");
const { Rol } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { encriptar } = require("../helpers/encriptarPassword");
const { generarToken } = require("../helpers/generarToken");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");

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

  const contrasenaEncriptada = await encriptar(contrasena);

  return await usuarioRepository.guardarUsuario({
    nombres,
    apellidos,
    correo,
    contrasena: contrasenaEncriptada,
    rolId,
  });
};

exports.autenticarUsuario = async (correo, contrasena) => {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!esValida) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const token = generarToken(usuario);

  // Incluir el objeto rol completo
  const rol = await Rol.findByPk(usuario.rolId);

  return {
    token,
    usuario: {
      id: usuario.id,
      nombres: usuario.nombres,
      rolId: usuario.rolId,
      rol: rol
        ? {
            id: rol.id,
            nombreRol: rol.nombreRol,
          }
        : null,
    },
  };
};

exports.obtenerTodos = async (
  paginaActual = 1,
  registrosPorPagina = 10,
  filtros = {},
) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await usuarioRepository.buscarTodosConPaginacion(
    limit,
    offset,
    filtros,
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina,
  );
};

exports.obtenerPorId = async (id) => {
  return await usuarioRepository.buscarPorId(id);
};

exports.obtenerMiPerfil = async (id) => {
  return await usuarioRepository.buscarPorId(id);
};

exports.actualizarDatos = async (id, datos) => {
  if (datos.contrasena) {
    datos.contrasena = await encriptar(datos.contrasena);
  }
  return await usuarioRepository.actualizarDatos(id, datos);
};

exports.actualizarRol = async (id, rolId) => {
  return await usuarioRepository.actualizarRol(id, rolId);
};

exports.eliminarUsuario = async (id) => {
  return await usuarioRepository.eliminarUsuario(id);
};

exports.solicitarRecuperacion = async (correo) => {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) throw new Error("USUARIO_NO_ENCONTRADO");

  const token = crypto.randomBytes(20).toString("hex");
  const expira = new Date(Date.now() + 3600000);

  await usuarioRepository.actualizarTokenRecuperacion(
    usuario.id,
    token,
    expira,
  );

  return token;
};

exports.cambiarContrasena = async (token, nuevaContrasena) => {
  const usuario = await usuarioRepository.buscarPorToken(token);
  if (!usuario || usuario.resetPasswordExpires < new Date()) {
    throw new Error("TOKEN_INVALIDO_O_EXPIRADO");
  }

  const hash = await encriptar(nuevaContrasena);

  await usuarioRepository.actualizarContrasena(usuario.id, hash);
  return true;
};
