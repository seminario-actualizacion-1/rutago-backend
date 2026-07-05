const viajeRepository = require("../repositories/viaje.repository");
const usuarioRepository = require("../repositories/usuario.repository");
const barrioRepository = require("../repositories/barrio.repository");
const perfilConductorRepository = require("../repositories/perfilconductor.repository");
const { ROLES } = require("../config/roles");
const {
  formatearRespuestaPaginada,
  calcularOffset,
} = require("../helpers/paginacion.helper");
const { ESTADOS_VIAJE, ESTADOS_CONDUCTOR, TRANSICIONES_VIAJE } = require("../config/estados");

const ESTADOS_VALIDOS = Object.values(ESTADOS_VIAJE);

exports.obtenerTodos = async (paginaActual = 1, registrosPorPagina = 10, q, sortBy = "createdAt", sortOrder = "DESC") => {
  const offset = calcularOffset(paginaActual, registrosPorPagina);
  const limit = parseInt(registrosPorPagina);

  const { count, rows } = await viajeRepository.obtenerTodosConPaginacion(
    limit,
    offset,
    q,
    sortBy,
    sortOrder
  );

  return formatearRespuestaPaginada(
    rows,
    count,
    paginaActual,
    registrosPorPagina
  );
};

exports.obtenerPorId = async (id) => {
  return await viajeRepository.obtenerPorId(id);
};

exports.obtenerMisViajes = async (usuarioId, rolId) => {
  const esConductor = rolId === ROLES.CONDUCTOR;
  return await viajeRepository.obtenerMisViajes(usuarioId, esConductor);
};

exports.crearViaje = async (datos) => {
  if (datos.conductorId && datos.pasajeroId === datos.conductorId) {
    throw new Error("NO_PUEDE_SOLICITAR_VIAJE_A_SI_MISMO");
  }

  if (datos.precioEstimado !== undefined && datos.precioEstimado !== null) {
    const precio = parseFloat(datos.precioEstimado);
    if (isNaN(precio) || precio <= 0) {
      throw new Error("PRECIO_DEBE_SER_MAYOR_A_CERO");
    }
    datos.precioEstimado = precio;
  }

  const pasajero = await usuarioRepository.buscarPorId(datos.pasajeroId);
  if (!pasajero) throw new Error("PASAJERO_NO_ENCONTRADO");
  if (pasajero.rolId !== ROLES.PASAJERO) throw new Error("EL_USUARIO_NO_ES_PASAJERO");

  const origen = await barrioRepository.obtenerPorId(datos.barrioOrigenId);
  if (!origen) throw new Error("BARRIO_ORIGEN_NO_ENCONTRADO");

  const destino = await barrioRepository.obtenerPorId(datos.barrioDestinoId);
  if (!destino) throw new Error("BARRIO_DESTINO_NO_ENCONTRADO");

  return await viajeRepository.crearViaje(datos);
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
    const perfil = await perfilConductorRepository.obtenerPorUsuario(conductorId);
    if (!perfil) throw new Error("CONDUCTOR_SIN_PERFIL");
    if (perfil.estadoId !== ESTADOS_CONDUCTOR.DISPONIBLE) {
      throw new Error("CONDUCTOR_NO_DISPONIBLE");
    }
    return await viajeRepository.actualizarViaje(id, { estadoId: nuevoEstadoId, conductorId });
  }

  return await viajeRepository.actualizarViaje(id, { estadoId: nuevoEstadoId });
};
