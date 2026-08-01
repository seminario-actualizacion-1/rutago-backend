
exports.RespuestaConductoresDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    usuario: model.usuario
      ? {
          id: model.usuario.id,
          nombres: model.usuario.nombres,
          apellidos: model.usuario.apellidos,
          correo: model.usuario.correo,
          rol: model.usuario.rol
            ? {
                id: model.usuario.rol.id,
                nombreRol: model.usuario.rol.nombreRol,
                descripcion: model.usuario.rol.descripcion,
              }
            : { id: model.usuario.rolId },
        }
      : undefined,
    vehiculo: model.vehiculo
      ? {
          id: model.vehiculo.id,
          placa: model.vehiculo.placa,
          marca: model.vehiculo.marca,
          modelo: model.vehiculo.modelo,
          color: model.vehiculo.color,
          capacidadPasajeros: model.vehiculo.capacidadPasajeros,
        }
      : null,
    licenciaConducir: model.licenciaConducir,
    estado: model.estadoConductor
      ? { id: model.estadoConductor.id, nombre: model.estadoConductor.nombre }
      : { id: model.estadoId },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
