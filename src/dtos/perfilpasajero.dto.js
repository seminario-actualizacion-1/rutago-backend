exports.paraCrear = (data) => ({
  usuarioId: data.usuarioId ? parseInt(data.usuarioId, 10) : undefined,
  telefono: data.telefono?.trim(),
  direccion: data.direccion?.trim(),
  tipoDocumentoId: data.tipoDocumentoId ? parseInt(data.tipoDocumentoId, 10) : undefined,
  numeroDocumento: data.numeroDocumento?.trim(),
  fechaNacimiento: data.fechaNacimiento || undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.usuarioId) dto.usuarioId = parseInt(data.usuarioId, 10);
  if (data.telefono && data.telefono.trim()) dto.telefono = data.telefono.trim();
  if (data.direccion && data.direccion.trim()) dto.direccion = data.direccion.trim();
  if (data.tipoDocumentoId) dto.tipoDocumentoId = parseInt(data.tipoDocumentoId, 10);
  if (data.numeroDocumento && data.numeroDocumento.trim()) dto.numeroDocumento = data.numeroDocumento.trim();
  if (data.fechaNacimiento) dto.fechaNacimiento = data.fechaNacimiento;
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
    telefono: model.telefono,
    direccion: model.direccion,
    tipoDocumento: model.tipoDocumento
      ? { id: model.tipoDocumento.id, nombre: model.tipoDocumento.nombre, descripcion: model.tipoDocumento.descripcion }
      : null,
    numeroDocumento: model.numeroDocumento,
    fechaNacimiento: model.fechaNacimiento,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
