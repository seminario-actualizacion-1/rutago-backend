exports.paraCrear = (data) => ({
  nombres: data.nombres?.trim(),
  apellidos: data.apellidos?.trim(),
  correo: data.correo?.trim().toLowerCase(),
  contrasena: data.contrasena,
  rolId: data.rolId ? parseInt(data.rolId, 10) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.nombres && data.nombres.trim()) dto.nombres = data.nombres.trim();
  if (data.apellidos && data.apellidos.trim()) dto.apellidos = data.apellidos.trim();
  if (data.correo && data.correo.trim()) dto.correo = data.correo.trim().toLowerCase();
  if (data.contrasena) dto.contrasena = data.contrasena;
  if (data.rolId) dto.rolId = parseInt(data.rolId, 10);
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombres: model.nombres,
    apellidos: model.apellidos,
    correo: model.correo,
    rol: model.rol ? { id: model.rol.id, nombreRol: model.rol.nombreRol, descripcion: model.rol.descripcion } : { id: model.rolId },
    perfilConductor: model.perfilConductor ? {
      id: model.perfilConductor.id,
      vehiculoId: model.perfilConductor.vehiculoId,
      licenciaConducir: model.perfilConductor.licenciaConducir,
      estadoId: model.perfilConductor.estadoId,
      vehiculo: model.perfilConductor.vehiculo ? { id: model.perfilConductor.vehiculo.id, placa: model.perfilConductor.vehiculo.placa } : null,
    } : undefined,
    perfilEntidad: model.perfilEntidad ? {
      id: model.perfilEntidad.id,
      razonSocial: model.perfilEntidad.razonSocial,
      nit: model.perfilEntidad.nit,
      telefonoContacto: model.perfilEntidad.telefonoContacto,
    } : undefined,
    perfilPasajero: model.perfilPasajero ? {
      id: model.perfilPasajero.id,
      telefono: model.perfilPasajero.telefono,
      direccion: model.perfilPasajero.direccion,
      tipoDocumentoId: model.perfilPasajero.tipoDocumentoId,
      numeroDocumento: model.perfilPasajero.numeroDocumento,
      fechaNacimiento: model.perfilPasajero.fechaNacimiento,
    } : undefined,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};

exports.paraLogin = (data) => ({
  correo: data.correo?.trim().toLowerCase(),
  contrasena: data.contrasena,
});
