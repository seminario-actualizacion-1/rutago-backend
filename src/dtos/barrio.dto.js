exports.RespuestaBarriosDto = (model) => {
  if (!model) return null;
  return {
    id: model.id,
    nombre: model.nombre,
    comuna: model.comuna
      ? { id: model.comuna.id, nombre: model.comuna.nombre }
      : { id: model.comunaId },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};
