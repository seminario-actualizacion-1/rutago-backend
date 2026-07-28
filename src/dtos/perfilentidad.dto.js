
exports.RespuestaEntidadesDto = (model) => {
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
    razonSocial: model.razonSocial,
    nit: model.nit,
    telefonoContacto: model.telefonoContacto,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
