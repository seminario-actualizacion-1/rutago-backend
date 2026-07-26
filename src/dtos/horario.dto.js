exports.paraCrear = (data) => ({
  rutaId: data.rutaId ? parseInt(data.rutaId, 10) : undefined,
  vehiculoId: data.vehiculoId ? parseInt(data.vehiculoId, 10) : undefined,
  horaSalida: data.horaSalida?.trim(),
  frecuenciaMinutos: data.frecuenciaMinutos
    ? parseInt(data.frecuenciaMinutos, 10)
    : undefined,
  fechaInicio: data.fechaInicio || null,
  fechaFin: data.fechaFin || null,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.rutaId) dto.rutaId = parseInt(data.rutaId, 10);
  if (data.vehiculoId) dto.vehiculoId = parseInt(data.vehiculoId, 10);
  if (data.horaSalida && data.horaSalida.trim())
    dto.horaSalida = data.horaSalida.trim();
  if (data.frecuenciaMinutos)
    dto.frecuenciaMinutos = parseInt(data.frecuenciaMinutos, 10);
  if (data.fechaInicio) dto.fechaInicio = data.fechaInicio;
  if (data.fechaFin) dto.fechaFin = data.fechaFin;
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    ruta: model.ruta
      ? { id: model.ruta.id, nombre: model.ruta.nombre }
      : { id: model.rutaId },
    vehiculo: model.vehiculo
      ? { id: model.vehiculo.id, placa: model.vehiculo.placa }
      : { id: model.vehiculoId },
    horaSalida: model.horaSalida,
    frecuenciaMinutos: model.frecuenciaMinutos,
    fechaInicio: model.fechaInicio,
    fechaFin: model.fechaFin,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
