
exports.RespuestaPasajerosDto = (model) => {
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
    telefono: model.telefono,
    direccion: model.direccion,
    tipoDocumento: model.tipoDocumento
      ? {
          id: model.tipoDocumento.id,
          nombre: model.tipoDocumento.nombre,
          descripcion: model.tipoDocumento.descripcion,
        }
      : null,
    numeroDocumento: model.numeroDocumento,
    fechaNacimiento: model.fechaNacimiento,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
