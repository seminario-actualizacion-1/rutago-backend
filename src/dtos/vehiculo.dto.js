
exports.RespuestaVehiculosDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    placa: model.placa,
    marca: model.marca,
    modelo: model.modelo,
    color: model.color,
    capacidadPasajeros: model.capacidadPasajeros,
    entidad: model.entidad
      ? {
          id: model.entidad.id,
          razonSocial: model.entidad.razonSocial,
          nit: model.entidad.nit,
          telefonoContacto: model.entidad.telefonoContacto,
          usuario: model.entidad.usuario
            ? {
                id: model.entidad.usuario.id,
                nombres: model.entidad.usuario.nombres,
                correo: model.entidad.usuario.correo,
                rol: model.entidad.usuario.rol
                  ? {
                      id: model.entidad.usuario.rol.id,
                      nombreRol: model.entidad.usuario.rol.nombreRol,
                    }
                  : { id: model.entidad.usuario.rolId },
              }
            : undefined,
        }
      : undefined,
    estado: model.estadoVehiculo
      ? {
          id: model.estadoVehiculo.id,
          nombre: model.estadoVehiculo.nombre,
          descripcion: model.estadoVehiculo.descripcion,
        }
      : { id: model.estadoId },
    latitud: model.latitud ? parseFloat(model.latitud) : null,
    longitud: model.longitud ? parseFloat(model.longitud) : null,
    ultimaActualizacion: model.ultimaActualizacion,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
