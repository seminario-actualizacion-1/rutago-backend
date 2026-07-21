const { Op } = require("sequelize");
const { Vehiculo, PerfilEntidad, EstadoVehiculo, Usuario, Rol } = require("../models");
const includeEntidad = {
  model: PerfilEntidad, as: "perfilEntidad",
  include: [{ model: Usuario, as: "usuario", attributes: ["id", "nombres", "apellidos", "correo", "rolId"], include: [{ model: Rol, as: "rol", attributes: ["id", "nombreRol"] }] }],
};
const includeVehiculo = [includeEntidad, { model: EstadoVehiculo, as: "estadoVehiculo" }];

exports.obtenerTodos = async () => {
  return await Vehiculo.findAll({
    include: includeVehiculo,
  });
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, estadoId, sortBy = "id", sortOrder = "ASC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { placa: { [Op.like]: `%${q}%` } },
      { marca: { [Op.like]: `%${q}%` } },
      { modelo: { [Op.like]: `%${q}%` } },
      { color: { [Op.like]: `%${q}%` } },
    ];
  }
  if (estadoId) {
    where.estadoId = estadoId;
  }
  return await Vehiculo.findAndCountAll({
    include: includeVehiculo,
    where,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerPorId = async (id) => {
  const vehiculo = await Vehiculo.findByPk(id, {
    include: includeVehiculo,
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
