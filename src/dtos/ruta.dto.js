exports.RespuestaRutasDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    origen: model.origen
      ? { id: model.origen.id, nombre: model.origen.nombre }
      : { id: model.origenId },
    destino: model.destino
      ? { id: model.destino.id, nombre: model.destino.nombre }
      : { id: model.destinoId },
    descripcion: model.descripcion,
    distanciaKm: model.distanciaKm ? parseFloat(model.distanciaKm) : null,
    tiempoEstimadoMinutos: model.tiempoEstimadoMinutos,
    rutaGeometria: model.rutaGeometria || null,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
