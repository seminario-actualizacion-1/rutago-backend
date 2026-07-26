exports.paraCrear = (data) => ({
  rutaId: data.rutaId ? parseInt(data.rutaId, 10) : undefined,
  horarioId: data.horarioId ? parseInt(data.horarioId, 10) : undefined,
  precioEstimado:
    data.precioEstimado !== undefined && data.precioEstimado !== null
      ? parseFloat(data.precioEstimado)
      : undefined,
});

exports.paraActualizar = (data) => {
  const actualizado = {};
  if (data.rutaId !== undefined) actualizado.rutaId = parseInt(data.rutaId, 10);
  if (data.horarioId !== undefined)
    actualizado.horarioId = data.horarioId
      ? parseInt(data.horarioId, 10)
      : null;
  if (data.conductorId !== undefined)
    actualizado.conductorId = data.conductorId
      ? parseInt(data.conductorId, 10)
      : null;
  if (data.precioEstimado !== undefined) {
    actualizado.precioEstimado =
      data.precioEstimado !== null && data.precioEstimado !== ""
        ? parseFloat(data.precioEstimado)
        : null;
  }
  if (data.estadoId !== undefined)
    actualizado.estadoId = parseInt(data.estadoId, 10);
  return actualizado;
};

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
    pasajeros: (model.pasajeros || []).map((vp) =>
      usuarioParaRespuesta(vp.pasajero),
    ),
    conductor: usuarioParaRespuesta(model.conductor),
    ruta: model.ruta
      ? {
          id: model.ruta.id,
          nombre: model.ruta.nombre,
          distanciaKm: model.ruta.distanciaKm
            ? parseFloat(model.ruta.distanciaKm)
            : null,
          tiempoEstimadoMinutos: model.ruta.tiempoEstimadoMinutos,
          rutaGeometria: model.ruta.rutaGeometria || null,
          origen: model.ruta.origen
            ? { id: model.ruta.origen.id, nombre: model.ruta.origen.nombre }
            : undefined,
          destino: model.ruta.destino
            ? { id: model.ruta.destino.id, nombre: model.ruta.destino.nombre }
            : undefined,
        }
      : undefined,
    horario: model.horario
      ? {
          id: model.horario.id,
          horaSalida: model.horario.horaSalida,
          frecuenciaMinutos: model.horario.frecuenciaMinutos,
          capacidadPasajeros:
            model.horario.vehiculo?.capacidadPasajeros || null,
        }
      : undefined,
    estado: model.estadoViaje
      ? { id: model.estadoViaje.id, nombre: model.estadoViaje.nombre }
      : undefined,
    precioEstimado: model.precioEstimado
      ? parseFloat(model.precioEstimado)
      : null,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
