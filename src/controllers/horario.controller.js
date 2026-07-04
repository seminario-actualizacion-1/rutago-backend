const horarioService = require("../services/horario.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await horarioService.obtenerTodos(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder
    );
    res.json({ success: true, ...resultado });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const horario = await horarioService.obtenerPorId(req.params.id);
    res.json({ success: true, data: horario });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorRuta = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorRuta(req.params.rutaId);
    res.json({ success: true, data: horarios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorVehiculo = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerPorVehiculo(
      req.params.vehiculoId
    );
    res.json({ success: true, data: horarios });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearHorario = async (req, res) => {
  try {
    const { vehiculoId, rutaId, horaSalida, frecuenciaMinutos, diasSemana } = req.body;
    const datos = { vehiculoId, rutaId, horaSalida, frecuenciaMinutos, diasSemana };
    const horario = await horarioService.crearHorario(datos);
    res
      .status(201)
      .json({ success: true, message: "Horario creado", data: horario });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarHorario = async (req, res) => {
  try {
    const { vehiculoId, rutaId, horaSalida, frecuenciaMinutos, diasSemana } = req.body;
    const datos = { vehiculoId, rutaId, horaSalida, frecuenciaMinutos, diasSemana };
    const horario = await horarioService.actualizarHorario(
      req.params.id,
      datos
    );
    res.json({ success: true, message: "Horario actualizado", data: horario });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarHorario = async (req, res) => {
  try {
    await horarioService.eliminarHorario(req.params.id);
    res.json({ success: true, message: "Horario eliminado" });
  } catch (error) {
    if (error.message === "HORARIO_NO_ENCONTRADO") {
      return res
        .status(404)
        .json({ success: false, message: "Horario no encontrado" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
