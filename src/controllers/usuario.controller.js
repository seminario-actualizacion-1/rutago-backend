const usuarioService = require("../services/usuario.service");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, correo, contrasena, rolId } = req.body;

    if (!nombres || !apellidos || !correo || !contrasena) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    const datosParaCrear = {
      nombres,
      apellidos,
      correo,
      contrasena,
      rolId: rolId || 3,
    };

    const nuevoUsuario = await usuarioService.crearUsuario(datosParaCrear);

    return res.status(201).json({
      success: true,
      message: "¡Usuario registrado con éxito en RutaGo!",
      usuario: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        correo: nuevoUsuario.correo,
      },
    });
  } catch (error) {
    if (error.message === "EL_CORREO_YA_EXISTE") {
      return res.status(400).json({
        success: false,
        message: "El correo electrónico ya está registrado.",
      });
    }

    if (error.message === "ROL_NO_EXISTE") {
      return res.status(400).json({
        success: false,
        message: "El rol seleccionado no existe.",
      });
    }

    console.error("Error en el controlador de registro:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ success: false, message: "Correo y contraseña requeridos." });
    }

    const resultado = await usuarioService.autenticarUsuario(
      correo,
      contrasena,
    );

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso.",
      ...resultado,
    });
  } catch (error) {
    if (error.message === "CREDENCIALES_INVALIDAS") {
      return res
        .status(401)
        .json({ success: false, message: "Correo o contraseña incorrectos." });
    }
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor." });
  }
};

exports.recuperarContrasena = async (req, res) => {
  try {
    const { correo } = req.body;
    const token = await usuarioService.solicitarRecuperacion(correo);
    res.json({ success: true, message: "Token generado", token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cambiarContrasena = async (req, res) => {
  try {
    const { token, nuevaContrasena } = req.body;
    await usuarioService.cambiarContrasena(token, nuevaContrasena);
    res.json({
      success: true,
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerMiPerfil = async (req, res) => {
  try {
    if (!req.usuario || !req.usuario.id) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no autenticado" });
    }
    const usuario = await usuarioService.obtenerMiPerfil(req.usuario.id);
    res.json({ success: true, data: usuario });
  } catch (error) {
    console.error("Error en obtenerMiPerfil:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const { nombres, apellidos, correo } = req.body;
    const usuario = await usuarioService.actualizarDatos(req.usuario.id, {
      nombres,
      apellidos,
      correo,
    });
    res.json({ success: true, message: "Perfil actualizado", data: usuario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, correo } = req.body;
    const usuario = await usuarioService.actualizarDatos(req.params.id, {
      nombres,
      apellidos,
      correo,
    });
    res.json({ success: true, message: "Usuario actualizado", data: usuario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cambiarRol = async (req, res) => {
  try {
    const { rolId } = req.body;
    const usuario = await usuarioService.actualizarRol(req.params.id, rolId);
    res.json({ success: true, message: "Rol actualizado", data: usuario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    res.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
