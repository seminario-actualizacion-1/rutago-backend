const bcrypt = require("bcryptjs");

exports.encriptar = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(contrasena, salt);
};

exports.comparar = async (contrasena, hash) => {
  return bcrypt.compare(contrasena, hash);
};
