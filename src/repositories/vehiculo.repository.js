const { Vehiculo, PerfilEntidad } = require("../models");

const ESTADOS_VALIDOS = ["EN_TERMINAL", "EN_RUTA", "PROXIMO"];

const validarVehiculoPayload = async (datos) => {
  const { placa, marca, modelo, color, capacidadPasajeros, entidadId, estado } =
    datos;

  if (!placa || !marca || !modelo || !color) {
    throw new Error("PLACA_MARCA_MODELO_Y_COLOR_SON_OBLIGATORIOS");
  }

  if (capacidadPasajeros == null || Number(capacidadPasajeros) <= 0) {
    throw new Error("CAPACIDAD_INVALIDA");
  }

  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    throw new Error("ESTADO_VEHICULO_INVALIDO");
  }

  if (entidadId) {
    const entidad = await PerfilEntidad.findByPk(entidadId);
    if (!entidad) throw new Error("ENTIDAD_NO_ENCONTRADA");
  }
};

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
  await validarVehiculoPayload(datos);
  return await Vehiculo.create(datos);
};

exports.actualizarVehiculo = async (id, datos) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");

  await validarVehiculoPayload({ ...vehiculo.toJSON(), ...datos });

  return await vehiculo.update(datos);
};

exports.eliminarVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findByPk(id);
  if (!vehiculo) throw new Error("VEHICULO_NO_ENCONTRADO");
  await vehiculo.destroy();
  return true;
};
