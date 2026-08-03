const authService = require("../services/auth.service");
const usuarioService = require("../services/usuario.service");

exports.login = async (req, res) => {
  try {
    const resultado = await authService.autenticarUsuario(
      req.body.correo,
      req.body.contrasena,
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

exports.refrescarToken = async (req, res) => {
  try {
    const tokens = await authService.refrescarToken(req.body.refreshToken);
    res.json({ success: true, ...tokens });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Refresh token inválido o expirado" });
  }
};

exports.verificarToken = async (req, res) => {
  try {
    if (!req.usuario || !req.usuario.id) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido" });
    }
    const usuario = await usuarioService.obtenerPorId(req.usuario.id);
    return res.status(200).json({
      success: true,
      usuario: {
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rolId: usuario.rolId,
        rol: usuario.rol
          ? { id: usuario.rol.id, nombreRol: usuario.rol.nombreRol }
          : { id: usuario.rolId },
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
