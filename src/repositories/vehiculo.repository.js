const { Vehiculo, PerfilEntidad } = require("../models");

exports.obtenerTodos = async () => {
  return await Vehiculo.findAll({
    include: [{ model: PerfilEntidad, as: "perfilEntidad" }],
  });
};

exports.obtenerPorId = async (id) => {
  const vehiculo = await Vehiculo.findByPk(id, {
    include: [{ model: PerfilEntidad, as: "perfilEntidad" }],
  });
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  return vehiculo;
};

exports.crearVehiculo = async (datos) => {
  const { entidadId } = datos;

  if (entidadId) {
    const entidad = await PerfilEntidad.findByPk(entidadId);
    if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  }

  return await Vehiculo.create(datos);
};

exports.actualizarVehiculo = async (id, datos) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");

  if (datos.entidadId) {
    const entidad = await PerfilEntidad.findByPk(datos.entidadId);
    if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  }

  return await vehiculo.update(datos);
};

exports.eliminarVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  await vehiculo.destroy();
  return true;
};
