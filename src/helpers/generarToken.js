const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rolId: usuario.rolId },
    config.jwt.secreto,
    { expiresIn: config.jwt.expiracion },
  );
};

exports.generarRefreshToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, type: "refresh" },
    config.jwt.secreto,
    { expiresIn: config.jwt.refreshExpiracion },
  );
};
