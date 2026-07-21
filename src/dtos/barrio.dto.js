exports.paraCrear = (data) => ({
  nombre: data.nombre?.trim(),
  comunaId: data.comunaId ? parseInt(data.comunaId, 10) : undefined,
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.nombre && data.nombre.trim()) dto.nombre = data.nombre.trim();
  if (data.comunaId) dto.comunaId = parseInt(data.comunaId, 10);
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    comuna: model.comuna ? { id: model.comuna.id, nombre: model.comuna.nombre } : { id: model.comunaId },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
