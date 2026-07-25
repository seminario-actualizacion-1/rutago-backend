const jwt = require("jsonwebtoken");

exports.generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rolId: usuario.rolId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );
};

exports.generarRefreshToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, type: "refresh" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};
