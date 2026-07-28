const viajeRepository = require("../repositories/viaje.repository");
const rutaRepository = require("../repositories/ruta.repository");
const horarioRepository = require("../repositories/horario.repository");
const perfilConductorRepository = require("../repositories/perfilconductor.repository");
const vehiculoRepository = require("../repositories/vehiculo.repository");
const { ROLES } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const {
  ESTADOS_VIAJE,
  ESTADOS_CONDUCTOR,
  ESTADOS_VEHICULO,
  TRANSICIONES_VIAJE,
} = require("../config/estados");

const ESTADOS_VALIDOS = Object.values(ESTADOS_VIAJE);

const MAPA_VEHICULO = {
  [ESTADOS_VIAJE.BUSCANDO]: ESTADOS_VEHICULO.EN_TERMINAL,
  [ESTADOS_VIAJE.ACEPTADO]: ESTADOS_VEHICULO.PROXIMO,
  [ESTADOS_VIAJE.EN_CURSO]: ESTADOS_VEHICULO.EN_RUTA,
  [ESTADOS_VIAJE.FINALIZADO]: ESTADOS_VEHICULO.EN_TERMINAL,
  [ESTADOS_VIAJE.CANCELADO]: ESTADOS_VEHICULO.EN_TERMINAL,
};

const actualizarEstadoVehiculo = async (viaje, nuevoEstadoViaje) => {
  if (!viaje.horarioId) return;
  const horario = await horarioRepository.obtenerPorId(viaje.horarioId);
  if (!horario?.vehiculoId) return;
  const estadoVehiculo = MAPA_VEHICULO[nuevoEstadoViaje];
  if (estadoVehiculo) {
    await vehiculoRepository.actualizarVehiculo(horario.vehiculoId, {
      estadoId: estadoVehiculo,
    });
  }
};

exports.obtenerTodos = async (
  paginaActual = 1,
  registrosPorPagina = 10,
  q,
  sortBy = "createdAt",
  sortOrder = "DESC",
  estadoId,
) => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await viajeRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    q,
    sortBy,
    sortOrder,
    estadoId,
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina,
  );
};

exports.obtenerDisponibles = async (conductorId) => {
  const perfil = await perfilConductorRepository.obtenerPorUsuario(conductorId);
  const vehiculoId = perfil ? perfil.vehiculoId : null;
  return await viajeRepository.obtenerDisponibles(vehiculoId);
};

exports.obtenerDisponiblesPasajero = async (pasajeroId) => {
  return await viajeRepository.obtenerDisponiblesPasajero(pasajeroId);
};

exports.unirseAViaje = async (viajeId, pasajeroId) => {
  const viaje = await viajeRepository.obtenerPorId(viajeId);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");
  if (
    viaje.estadoId !== ESTADOS_VIAJE.BUSCANDO &&
    viaje.estadoId !== ESTADOS_VIAJE.ACEPTADO
  ) {
    throw new Error("VIAJE_NO_DISPONIBLE");
  }

  const yaEsPasajero = (viaje.pasajeros || []).some(
    (vp) => vp.pasajeroId === pasajeroId,
  );
  if (yaEsPasajero) throw new Error("YA_ES_PASAJERO");

  const enCurso = await viajeRepository.obtenerEnCursoPorPasajero(pasajeroId);
  if (enCurso) throw new Error("PASAJERO_EN_VIAJE");

  const capacidad = viaje.horario?.vehiculo?.capacidadPasajeros || 0;
  const ocupados = (viaje.pasajeros || []).length;
  if (ocupados >= capacidad) throw new Error("VIAJE_SIN_CUPO");

  await viajeRepository.agregarPasajero(viajeId, pasajeroId);
  return await viajeRepository.obtenerPorId(viajeId);
};

exports.bajarseDeViaje = async (viajeId, pasajeroId) => {
  const viaje = await viajeRepository.obtenerPorId(viajeId);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");

  const yaEsPasajero = (viaje.pasajeros || []).some(
    (vp) => vp.pasajeroId === pasajeroId,
  );
  if (!yaEsPasajero) throw new Error("NO_ES_PASAJERO");

  await viajeRepository.eliminarPasajero(viajeId, pasajeroId);
  return await viajeRepository.obtenerPorId(viajeId);
};

exports.obtenerPorId = async (id) => {
  return await viajeRepository.obtenerPorId(id);
};

exports.obtenerMisViajes = async (usuarioId, rolId) => {
  const esConductor = rolId === ROLES.CONDUCTOR;
  return await viajeRepository.obtenerMisViajes(usuarioId, esConductor);
};

exports.crearViaje = async (datos) => {
  const pasajeroId = datos.pasajeroId;
  delete datos.pasajeroId;

  if (datos.precioEstimado !== undefined && datos.precioEstimado !== null) {
    const precio = parseFloat(datos.precioEstimado);
    if (isNaN(precio) || precio < 0) {
      throw new Error("PRECIO_INVALIDO");
    }
    datos.precioEstimado = precio;
  }

  const ruta = await rutaRepository.obtenerPorId(datos.rutaId);
  if (!ruta) throw new Error("RUTA_NO_ENCONTRADA");

  if (datos.horarioId) {
    const horario = await horarioRepository.obtenerPorId(datos.horarioId);
    if (!horario) throw new Error("HORARIO_NO_ENCONTRADO");
    if (horario.rutaId !== datos.rutaId) {
      throw new Error("HORARIO_NO_PERTENECE_A_RUTA");
    }
  }

  const viaje = await viajeRepository.crearViaje(datos);

  if (pasajeroId) {
    await viajeRepository.agregarPasajero(viaje.id, pasajeroId);
  }

  return await viajeRepository.obtenerPorId(viaje.id);
};

exports.actualizarViaje = async (id, datos) => {
  const viaje = await viajeRepository.obtenerPorIdSimple(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");

  if (datos.rutaId) {
    const ruta = await rutaRepository.obtenerPorId(datos.rutaId);
    if (!ruta) throw new Error("RUTA_NO_ENCONTRADA");
  }

  if (datos.horarioId) {
    const horario = await horarioRepository.obtenerPorId(datos.horarioId);
    if (!horario) throw new Error("HORARIO_NO_ENCONTRADO");
    const rutaId = datos.rutaId || viaje.rutaId;
    if (horario.rutaId !== rutaId) {
      throw new Error("HORARIO_NO_PERTENECE_A_RUTA");
    }
  }

  if (
    viaje.estadoId === ESTADOS_VIAJE.FINALIZADO ||
    viaje.estadoId === ESTADOS_VIAJE.CANCELADO
  ) {
    datos.estadoId = ESTADOS_VIAJE.BUSCANDO;
    datos.conductorId = null;
    await actualizarEstadoVehiculo(viaje, ESTADOS_VIAJE.BUSCANDO);
    return await viajeRepository.actualizarViaje(id, datos);
  }

  if ("conductorId" in datos) {
    const nuevoConductorId = datos.conductorId;
    const viejoConductorId = viaje.conductorId;

    if (nuevoConductorId && nuevoConductorId !== viejoConductorId) {
      const perfil = await perfilConductorRepository.obtenerPorUsuario(
        nuevoConductorId,
      );
      if (!perfil) throw new Error("CONDUCTOR_SIN_PERFIL");
      if (viaje.horarioId) {
        const existente = await viajeRepository.obtenerPorConductorYHorario(
          nuevoConductorId,
          viaje.horarioId,
          id,
        );
        if (existente) throw new Error("CONDUCTOR_OCUPADO_EN_HORARIO");
      }
      datos.estadoId = ESTADOS_VIAJE.ACEPTADO;
      await actualizarEstadoVehiculo(viaje, ESTADOS_VIAJE.ACEPTADO);
    }

    if (viejoConductorId && viejoConductorId !== nuevoConductorId) {
      const viejoPerfil = await perfilConductorRepository.obtenerPorUsuario(
        viejoConductorId,
      );
      if (viejoPerfil) {
        await perfilConductorRepository.actualizarEstado(
          viejoPerfil.id,
          ESTADOS_CONDUCTOR.DISPONIBLE,
        );
      }
    }

    if (!nuevoConductorId && viejoConductorId) {
      datos.estadoId = ESTADOS_VIAJE.BUSCANDO;
      await actualizarEstadoVehiculo(viaje, ESTADOS_VIAJE.BUSCANDO);
    }
  }

  return await viajeRepository.actualizarViaje(id, datos);
};

exports.actualizarEstado = async (id, nuevoEstadoId, conductorId = null) => {
  const viaje = await viajeRepository.obtenerPorIdSimple(id);
  if (!viaje) throw new Error("VIAJE_NO_ENCONTRADO");

  nuevoEstadoId = Number(nuevoEstadoId);
  if (!ESTADOS_VALIDOS.includes(nuevoEstadoId)) {
    throw new Error("ESTADO_NO_VALIDO");
  }

  const transicionesPermitidas = TRANSICIONES_VIAJE[viaje.estadoId] || [];
  if (!transicionesPermitidas.includes(nuevoEstadoId)) {
    throw new Error("TRANSICION_ESTADO_NO_VALIDA");
  }

  if (nuevoEstadoId === ESTADOS_VIAJE.ACEPTADO) {
    if (!conductorId) throw new Error("SE_REQUIERE_CONDUCTOR");
    const perfil =
      await perfilConductorRepository.obtenerPorUsuario(conductorId);
    if (!perfil) throw new Error("CONDUCTOR_SIN_PERFIL");
    if (viaje.horarioId) {
      const existente = await viajeRepository.obtenerPorConductorYHorario(
        conductorId,
        viaje.horarioId,
        viaje.id,
      );
      if (existente) throw new Error("CONDUCTOR_OCUPADO_EN_HORARIO");
    }
    await actualizarEstadoVehiculo(viaje, nuevoEstadoId);
    return await viajeRepository.actualizarViaje(id, {
      estadoId: nuevoEstadoId,
      conductorId,
    });
  }

  const datosActualizar = { estadoId: nuevoEstadoId };

  if (nuevoEstadoId === ESTADOS_VIAJE.CANCELADO || nuevoEstadoId === ESTADOS_VIAJE.FINALIZADO) {
    datosActualizar.conductorId = null;
  }

  const resultado = await viajeRepository.actualizarViaje(id, datosActualizar);
  await actualizarEstadoVehiculo(viaje, nuevoEstadoId);

  if (
    viaje.conductorId &&
    (nuevoEstadoId === ESTADOS_VIAJE.FINALIZADO ||
      nuevoEstadoId === ESTADOS_VIAJE.CANCELADO)
  ) {
    const perfil = await perfilConductorRepository.obtenerPorUsuario(
      viaje.conductorId,
    );
    if (perfil) {
      await perfilConductorRepository.actualizarEstado(
        perfil.id,
        ESTADOS_CONDUCTOR.DISPONIBLE,
      );
    }
  }

  return resultado;
};

exports.eliminarViaje = async (id) => {
  return await viajeRepository.eliminarViaje(id);
};
