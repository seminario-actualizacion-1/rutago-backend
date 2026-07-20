exports.paraCrear = (data) => ({
  placa: data.placa?.trim().toUpperCase(),
  marca: data.marca?.trim(),
  modelo: data.modelo?.trim(),
  color: data.color?.trim(),
  capacidadPasajeros: data.capacidadPasajeros ? parseInt(data.capacidadPasajeros, 10) : undefined,
  entidadId: data.entidadId ? parseInt(data.entidadId, 10) : undefined,
  estadoId: data.estadoId ? parseInt(data.estadoId, 10) : undefined,
  latitud: data.latitud ? parseFloat(data.latitud) : undefined,
  longitud: data.longitud ? parseFloat(data.longitud) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.placa && data.placa.trim()) dto.placa = data.placa.trim().toUpperCase();
  if (data.marca && data.marca.trim()) dto.marca = data.marca.trim();
  if (data.modelo && data.modelo.trim()) dto.modelo = data.modelo.trim();
  if (data.color && data.color.trim()) dto.color = data.color.trim();
  if (data.capacidadPasajeros) dto.capacidadPasajeros = parseInt(data.capacidadPasajeros, 10);
  if (data.entidadId) dto.entidadId = parseInt(data.entidadId, 10);
  if (data.estadoId) dto.estadoId = parseInt(data.estadoId, 10);
  if (data.latitud) dto.latitud = parseFloat(data.latitud);
  if (data.longitud) dto.longitud = parseFloat(data.longitud);
  return dto;
};

exports.paraActualizarUbicacion = (data) => ({
  latitud: data.latitud ? parseFloat(data.latitud) : undefined,
  longitud: data.longitud ? parseFloat(data.longitud) : undefined,
  estadoId: data.estadoId ? parseInt(data.estadoId, 10) : undefined,
});

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    placa: model.placa,
    marca: model.marca,
    modelo: model.modelo,
    color: model.color,
    capacidadPasajeros: model.capacidadPasajeros,
    entidadId: model.entidadId,
    estadoId: model.estadoId,
    latitud: model.latitud ? parseFloat(model.latitud) : null,
    longitud: model.longitud ? parseFloat(model.longitud) : null,
    ultimaActualizacion: model.ultimaActualizacion,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
