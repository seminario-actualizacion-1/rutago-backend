exports.RespuestaUsuariosDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombres: model.nombres,
    apellidos: model.apellidos,
    correo: model.correo,
    rol: model.rol
      ? {
          id: model.rol.id,
          nombreRol: model.rol.nombreRol,
          descripcion: model.rol.descripcion,
        }
      : { id: model.rolId },
    conductor: model.conductor
        ? {
            id: model.conductor.id,
            licenciaConducir: model.conductor.licenciaConducir,
            estadoId: model.conductor.estadoId,
          }
      : undefined,
    entidad: model.entidad
      ? {
          id: model.entidad.id,
          razonSocial: model.entidad.razonSocial,
          nit: model.entidad.nit,
          telefonoContacto: model.entidad.telefonoContacto,
        }
      : undefined,
    pasajero: model.pasajero
      ? {
          id: model.pasajero.id,
          telefono: model.pasajero.telefono,
          direccion: model.pasajero.direccion,
          tipoDocumentoId: model.pasajero.tipoDocumentoId,
          numeroDocumento: model.pasajero.numeroDocumento,
          fechaNacimiento: model.pasajero.fechaNacimiento,
        }
      : undefined,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
