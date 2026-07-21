exports.paraCrear = (data) => ({
  usuarioId: data.usuarioId ? parseInt(data.usuarioId, 10) : undefined,
  razonSocial: data.razonSocial?.trim(),
  nit: data.nit?.trim(),
  telefonoContacto: data.telefonoContacto?.trim(),
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.usuarioId) dto.usuarioId = parseInt(data.usuarioId, 10);
  if (data.razonSocial && data.razonSocial.trim()) dto.razonSocial = data.razonSocial.trim();
  if (data.nit && data.nit.trim()) dto.nit = data.nit.trim();
  if (data.telefonoContacto && data.telefonoContacto.trim()) dto.telefonoContacto = data.telefonoContacto.trim();
  return dto;
};

exports.paraRespuesta = (model) => {
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
            ? { id: model.usuario.rol.id, nombreRol: model.usuario.rol.nombreRol, descripcion: model.usuario.rol.descripcion }
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
