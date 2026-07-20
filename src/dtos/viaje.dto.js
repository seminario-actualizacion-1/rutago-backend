exports.paraCrear = (data) => ({
  barrioOrigenId: data.barrioOrigenId ? parseInt(data.barrioOrigenId, 10) : undefined,
  barrioDestinoId: data.barrioDestinoId ? parseInt(data.barrioDestinoId, 10) : undefined,
});

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    pasajeroId: model.pasajeroId,
    conductorId: model.conductorId,
    barrioOrigenId: model.barrioOrigenId,
    barrioDestinoId: model.barrioDestinoId,
    estadoId: model.estadoId,
    precioEstimado: model.precioEstimado ? parseFloat(model.precioEstimado) : null,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
