const authMiddleware = require("./auth.middleware");

exports.esAdministrador = (req, res, next) => {
  if (req.usuario && req.usuario.rolId === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Requiere permisos de administrador." });
  }
};

exports.esConductor = (req, res, next) => {
  if (req.usuario && req.usuario.rolId === 2) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Requiere permisos de conductor." });
  }
};

exports.esPasajero = (req, res, next) => {
  if (req.usuario && req.usuario.rolId === 3) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Requiere permisos de pasajero." });
  }
};

exports.esEntidad = (req, res, next) => {
  if (req.usuario && req.usuario.rolId === 4) {
    next();
  } else {
    return res
      .status(403)
      .json({
        success: false,
        message: "Requiere permisos de entidad externa.",
      });
  }
};
