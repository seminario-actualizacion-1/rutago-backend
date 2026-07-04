const { Op } = require("sequelize");
const { Horario, Vehiculo, Ruta } = require("../models");

exports.obtenerTodos = async () => {
  return await Horario.findAll({
    include: [
      { model: Vehiculo, as: "vehiculo" },
      { model: Ruta, as: "ruta" },
    ],
  });
};

exports.obtenerTodosConPaginacion = async (limit, offset, q, sortBy = "id", sortOrder = "ASC") => {
  const where = {};
  if (q) {
    where[Op.or] = [
      { horaSalida: { [Op.like]: `%${q}%` } },
      { '$vehiculo.placa$': { [Op.like]: `%${q}%` } },
      { '$ruta.nombre$': { [Op.like]: `%${q}%` } },
    ];
  }
  return await Horario.findAndCountAll({
    where,
    include: [
      { model: Vehiculo, as: "vehiculo" },
      { model: Ruta, as: "ruta" },
    ],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    distinct: true,
  });
};

exports.obtenerPorId = async (id) => {
  const horario = await Horario.findByPk(id, {
    include: [
      { model: Vehiculo, as: "vehiculo" },
      { model: Ruta, as: "ruta" },
    ],
  });
  if (!horario) throw new Error("HORARIO_NO_ENCONTRADO");
  return horario;
};

exports.obtenerPorRuta = async (rutaId) => {
  return await Horario.findAll({
    where: { rutaId },
    include: [
      { model: Vehiculo, as: "vehiculo" },
      { model: Ruta, as: "ruta" },
    ],
  });
};

exports.obtenerPorVehiculo = async (vehiculoId) => {
  return await Horario.findAll({
    where: { vehiculoId },
    include: [
      { model: Vehiculo, as: "vehiculo" },
      { model: Ruta, as: "ruta" },
    ],
  });
};

exports.crearHorario = async (datos) => {
  return await Horario.create(datos);
};

exports.actualizarHorario = async (id, datos) => {
  const horario = await Horario.findByPk(id);
  if (!horario) throw new Error("HORARIO_NO_ENCONTRADO");
  return await horario.update(datos);
};

exports.eliminarHorario = async (id) => {
  const horario = await Horario.findByPk(id);
  if (!horario) throw new Error("HORARIO_NO_ENCONTRADO");
  await horario.destroy();
  return true;
};
