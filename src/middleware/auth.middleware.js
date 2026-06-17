const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Acceso denegado. No hay token." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Token inválido." });
  }
};

exports.esAdministrador = (req, res, next) => {
  if (req.usuario && req.usuario.rolId === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Requiere permisos de administrador." });
  }
};
