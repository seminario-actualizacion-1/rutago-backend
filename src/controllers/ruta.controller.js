const rutaService = require("../services/ruta.service");
const rutaDto = require("../dtos/ruta.dto");

exports.obtenerTodas = async (req, res) => {
  try {
    const { paginaActual, registrosPorPagina, q, sortBy, sortOrder } = req.query;
    const resultado = await rutaService.obtenerTodas(
      paginaActual,
      registrosPorPagina,
      q,
      sortBy,
      sortOrder
    );
    res.json({ success: true, data: resultado.data.map(rutaDto.paraRespuesta), paginacion: resultado.paginacion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const ruta = await rutaService.obtenerPorId(req.params.id);
    res.json({ success: true, data: rutaDto.paraRespuesta(ruta) });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.buscarPorDestino = async (req, res) => {
  try {
    const { destino } = req.params;
    const rutas = await rutaService.buscarPorDestino(destino);
    res.json({ success: true, data: rutas.map(rutaDto.paraRespuesta) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearRuta = async (req, res) => {
  try {
    const datos = rutaDto.paraCrear(req.body);
    const ruta = await rutaService.crearRuta(datos);
    res.status(201).json({ success: true, message: "Ruta creada", data: rutaDto.paraRespuesta(ruta) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarRuta = async (req, res) => {
  try {
    const datos = rutaDto.paraActualizar(req.body);
    const ruta = await rutaService.actualizarRuta(req.params.id, datos);
    res.json({ success: true, message: "Ruta actualizada", data: rutaDto.paraRespuesta(ruta) });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarRuta = async (req, res) => {
  try {
    await rutaService.eliminarRuta(req.params.id);
    res.json({ success: true, message: "Ruta eliminada" });
  } catch (error) {
    if (error.message === "RUTA_NO_ENCONTRADA") {
      return res
        .status(404)
        .json({ success: false, message: "Ruta no encontrada" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
