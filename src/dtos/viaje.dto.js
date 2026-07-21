exports.paraCrear = (data) => ({
  barrioOrigenId: data.barrioOrigenId ? parseInt(data.barrioOrigenId, 10) : undefined,
  barrioDestinoId: data.barrioDestinoId ? parseInt(data.barrioDestinoId, 10) : undefined,
});

const usuarioParaRespuesta = (u) =>
  u
    ? {
        id: u.id,
        nombres: u.nombres,
        apellidos: u.apellidos,
        correo: u.correo,
        rol: u.rol
          ? { id: u.rol.id, nombreRol: u.rol.nombreRol }
          : { id: u.rolId },
      }
    : undefined;

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    pasajero: usuarioParaRespuesta(model.pasajero),
    conductor: usuarioParaRespuesta(model.conductor),
    barrioOrigen: model.barrioOrigen
      ? { id: model.barrioOrigen.id, nombre: model.barrioOrigen.nombre }
      : undefined,
    barrioDestino: model.barrioDestino
      ? { id: model.barrioDestino.id, nombre: model.barrioDestino.nombre }
      : undefined,
    estadoId: model.estadoId,
    precioEstimado: model.precioEstimado ? parseFloat(model.precioEstimado) : null,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
