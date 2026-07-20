exports.paraCrear = (data) => ({
  usuarioId: data.usuarioId ? parseInt(data.usuarioId, 10) : undefined,
  vehiculoId: data.vehiculoId ? parseInt(data.vehiculoId, 10) : undefined,
  licenciaConducir: data.licenciaConducir?.trim(),
  estadoId: data.estadoId ? parseInt(data.estadoId, 10) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.usuarioId) dto.usuarioId = parseInt(data.usuarioId, 10);
  if (data.vehiculoId) dto.vehiculoId = parseInt(data.vehiculoId, 10);
  if (data.licenciaConducir && data.licenciaConducir.trim()) dto.licenciaConducir = data.licenciaConducir.trim();
  if (data.estadoId) dto.estadoId = parseInt(data.estadoId, 10);
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    usuarioId: model.usuarioId,
    vehiculoId: model.vehiculoId,
    licenciaConducir: model.licenciaConducir,
    estadoId: model.estadoId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
