const { Op } = require("sequelize");
const { Vehiculo, PerfilEntidad } = require("../models");

exports.obtenerTodos = async () => {
  return await Vehiculo.findAll({
    include: [{ model: PerfilEntidad, as: "perfilEntidad" }],
  });
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, estado, sortBy = "id", sortOrder = "ASC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { placa: { [Op.like]: `%${q}%` } },
      { marca: { [Op.like]: `%${q}%` } },
      { modelo: { [Op.like]: `%${q}%` } },
      { color: { [Op.like]: `%${q}%` } },
    ];
  }
  if (estado) {
    where.estado = estado;
  }
  return await Vehiculo.findAndCountAll({
    include: [{ model: PerfilEntidad, as: "perfilEntidad" }],
    where,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
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
  return await Vehiculo.create(datos);
};

exports.actualizarVehiculo = async (id, datos) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  return await vehiculo.update(datos);
};

exports.eliminarVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  await vehiculo.destroy();
  return true;
};

exports.obtenerEntidadPorId = async (id) => {
  return await PerfilEntidad.findByPk(id);
};
