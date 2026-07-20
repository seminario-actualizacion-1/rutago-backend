exports.paraCrear = (data) => ({
  usuarioId: data.usuarioId ? parseInt(data.usuarioId, 10) : undefined,
  telefono: data.telefono?.trim(),
  direccion: data.direccion?.trim(),
  tipoDocumentoId: data.tipoDocumentoId ? parseInt(data.tipoDocumentoId, 10) : undefined,
  numeroDocumento: data.numeroDocumento?.trim(),
  fechaNacimiento: data.fechaNacimiento || undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.usuarioId) dto.usuarioId = parseInt(data.usuarioId, 10);
  if (data.telefono && data.telefono.trim()) dto.telefono = data.telefono.trim();
  if (data.direccion && data.direccion.trim()) dto.direccion = data.direccion.trim();
  if (data.tipoDocumentoId) dto.tipoDocumentoId = parseInt(data.tipoDocumentoId, 10);
  if (data.numeroDocumento && data.numeroDocumento.trim()) dto.numeroDocumento = data.numeroDocumento.trim();
  if (data.fechaNacimiento) dto.fechaNacimiento = data.fechaNacimiento;
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    usuarioId: model.usuarioId,
    telefono: model.telefono,
    direccion: model.direccion,
    tipoDocumentoId: model.tipoDocumentoId,
    numeroDocumento: model.numeroDocumento,
    fechaNacimiento: model.fechaNacimiento,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
