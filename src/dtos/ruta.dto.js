exports.paraCrear = (data) => ({
  nombre: data.nombre?.trim(),
  origenId: data.origenId ? parseInt(data.origenId, 10) : undefined,
  destinoId: data.destinoId ? parseInt(data.destinoId, 10) : undefined,
  descripcion: data.descripcion?.trim(),
  distanciaKm: data.distanciaKm ? parseFloat(data.distanciaKm) : undefined,
  tiempoEstimadoMinutos: data.tiempoEstimadoMinutos ? parseInt(data.tiempoEstimadoMinutos, 10) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.nombre && data.nombre.trim()) dto.nombre = data.nombre.trim();
  if (data.origenId) dto.origenId = parseInt(data.origenId, 10);
  if (data.destinoId) dto.destinoId = parseInt(data.destinoId, 10);
  if (data.descripcion && data.descripcion.trim()) dto.descripcion = data.descripcion.trim();
  if (data.distanciaKm) dto.distanciaKm = parseFloat(data.distanciaKm);
  if (data.tiempoEstimadoMinutos) dto.tiempoEstimadoMinutos = parseInt(data.tiempoEstimadoMinutos, 10);
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    origen: model.origen ? { id: model.origen.id, nombre: model.origen.nombre } : { id: model.origenId },
    destino: model.destino ? { id: model.destino.id, nombre: model.destino.nombre } : { id: model.destinoId },
    descripcion: model.descripcion,
    distanciaKm: model.distanciaKm ? parseFloat(model.distanciaKm) : null,
    tiempoEstimadoMinutos: model.tiempoEstimadoMinutos,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
