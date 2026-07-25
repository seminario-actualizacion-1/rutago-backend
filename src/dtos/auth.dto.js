exports.paraLogin = (data) => ({
  correo: data.correo?.trim().toLowerCase(),
  contrasena: data.contrasena,
});

exports.paraRefresh = (data) => ({
  refreshToken: data.refreshToken,
});
