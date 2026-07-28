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

exports.RespuestaViajesDto = (model) => {
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
          vehiculoPlaca: model.horario.vehiculo?.placa || null,
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
