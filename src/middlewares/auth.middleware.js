const jwt = require("jsonwebtoken");
const config = require("../config");

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Acceso denegado. No hay token." });
  }

  try {
    const verificado = jwt.verify(token, config.jwt.secreto);
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Token inválido." });
  }
};
