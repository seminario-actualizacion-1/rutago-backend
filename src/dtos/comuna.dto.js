exports.RespuestaComunasDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
