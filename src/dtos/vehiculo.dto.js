
exports.RespuestaVehiculosDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    placa: model.placa,
    marca: model.marca,
    modelo: model.modelo,
    color: model.color,
    capacidadPasajeros: model.capacidadPasajeros,
    entidad: model.perfilEntidad
      ? {
          id: model.perfilEntidad.id,
          razonSocial: model.perfilEntidad.razonSocial,
          nit: model.perfilEntidad.nit,
          telefonoContacto: model.perfilEntidad.telefonoContacto,
          usuario: model.perfilEntidad.usuario
            ? {
                id: model.perfilEntidad.usuario.id,
                nombres: model.perfilEntidad.usuario.nombres,
                correo: model.perfilEntidad.usuario.correo,
                rol: model.perfilEntidad.usuario.rol
                  ? {
                      id: model.perfilEntidad.usuario.rol.id,
                      nombreRol: model.perfilEntidad.usuario.rol.nombreRol,
                    }
                  : { id: model.perfilEntidad.usuario.rolId },
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
