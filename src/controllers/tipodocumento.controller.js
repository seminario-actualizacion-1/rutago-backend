const { TipoDocumento } = require("../models");

exports.obtenerTodos = async (req, res) => {
  try {
    const tipos = await TipoDocumento.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ success: true, data: tipos });
  } catch (error) {
    console.error("Error al obtener tipos de documento:", error);
    return res.status(500).json({ success: false, message: "Error al cargar tipos de documento" });
  }
};
