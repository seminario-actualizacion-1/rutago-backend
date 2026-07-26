const { EstadoViaje } = require("../models");

exports.obtenerTodos = async (req, res) => {
  try {
    const estados = await EstadoViaje.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ success: true, data: estados });
  } catch (error) {
    console.error("Error al obtener estados de viaje:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al cargar estados de viaje" });
  }
};
