const usuarioService = require("../services/usuario.service");

const manejarError = (res, error) => {
  if (error.message?.includes("_NO_ENCONTRADO")) {
    return res.status(404).json({ success: false, message: error.message });
  }
  res.status(400).json({ success: false, message: error.message });
};

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
    await usuarioService.solicitarRecuperacion(correo);
    res.json({ success: true, message: "Si el correo está registrado, recibirás un enlace de recuperación" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Si el correo está registrado, recibirás un enlace de recuperación" });
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
    const { paginaActual, registrosPorPagina, q, rolId, correo, sortBy, sortOrder } = req.query;
    const filtrosAplicados = { rolId, correo, q };
    const resultado = await usuarioService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      filtrosAplicados,
      sortBy,
      sortOrder
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: usuario });
  } catch (error) {
    manejarError(res, error);
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
    manejarError(res, error);
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
    manejarError(res, error);
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
    manejarError(res, error);
  }
};

exports.cambiarRol = async (req, res) => {
  try {
    const { rolId } = req.body;
    const usuario = await usuarioService.actualizarRol(req.params.id, rolId);
    res.json({ success: true, message: "Rol actualizado", data: usuario });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    res.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    manejarError(res, error);
  }
};

exports.verificarToken = async (req, res) => {
  try {
    // El middleware verificarToken ya validó el token y puso req.usuario
    if (!req.usuario || !req.usuario.id) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido" });
    }

    // Obtener datos actualizados del usuario desde la BD
    const usuario = await usuarioService.obtenerPorId(req.usuario.id);

    return res.status(200).json({
      success: true,
      usuario: {
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rolId: usuario.rolId,
        rol: usuario.rol ? usuario.rol.nombreRol : null,
      },
    });
  } catch (error) {
    console.error("Error en verificarToken:", error);
    return res.status(401).json({
      success: false,
      message: "Token inválido o usuario no encontrado",
    });
  }
};
