exports.paraCrear = (data) => ({
  nombres: data.nombres?.trim(),
  apellidos: data.apellidos?.trim(),
  correo: data.correo?.trim().toLowerCase(),
  contrasena: data.contrasena,
  rolId: data.rolId ? parseInt(data.rolId, 10) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.nombres && data.nombres.trim()) dto.nombres = data.nombres.trim();
  if (data.apellidos && data.apellidos.trim()) dto.apellidos = data.apellidos.trim();
  if (data.correo && data.correo.trim()) dto.correo = data.correo.trim().toLowerCase();
  if (data.contrasena) dto.contrasena = data.contrasena;
  if (data.rolId) dto.rolId = parseInt(data.rolId, 10);
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombres: model.nombres,
    apellidos: model.apellidos,
    correo: model.correo,
    rolId: model.rolId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};

exports.paraLogin = (data) => ({
  correo: data.correo?.trim().toLowerCase(),
  contrasena: data.contrasena,
});
