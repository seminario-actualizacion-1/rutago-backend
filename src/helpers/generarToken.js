const jwt = require("jsonwebtoken");

exports.generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rolId: usuario.rolId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );
};
