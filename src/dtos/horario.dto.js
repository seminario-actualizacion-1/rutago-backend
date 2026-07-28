exports.RespuestaHorariosDto = (model) => {
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
