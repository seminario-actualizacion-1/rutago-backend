const perfilConductorRepository = require("../repositories/perfilconductor.repository");

exports.obtenerTodos = async () => {
  return await perfilConductorRepository.obtenerTodos();
};

exports.obtenerPorId = async (id) => {
  return await perfilConductorRepository.obtenerPorId(id);
};

exports.obtenerPorUsuario = async (usuarioId) => {
  return await perfilConductorRepository.obtenerPorUsuario(usuarioId);
};

exports.crearPerfil = async (datos) => {
  return await perfilConductorRepository.crearPerfil(datos);
};

exports.actualizarPerfil = async (id, datos) => {
  return await perfilConductorRepository.actualizarPerfil(id, datos);
};

exports.actualizarMiPerfil = async (usuarioId, datos) => {
  const perfil = await perfilConductorRepository.obtenerPorUsuario(usuarioId);
  if (!perfil) {
    throw new Error("PERFIL_CONDUCTOR_NO_ENCONTRADO");
  }

  const datosPermitidos = {
    licenciaConducir: datos.licenciaConducir,
    estado: datos.estado,
  };

  return await perfilConductorRepository.actualizarPerfil(
    perfil.id,
    datosPermitidos,
  );
};

exports.actualizarEstado = async (id, estado) => {
  return await perfilConductorRepository.actualizarEstado(id, estado);
};

exports.eliminarPerfil = async (id) => {
  return await perfilConductorRepository.eliminarPerfil(id);
};
