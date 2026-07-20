exports.paraCrear = (data) => ({
  nombre: data.nombre?.trim(),
});

exports.paraActualizar = (data) => {
  const dto = {};
  if (data.nombre && data.nombre.trim()) dto.nombre = data.nombre.trim();
  return dto;
};

exports.paraRespuesta = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
