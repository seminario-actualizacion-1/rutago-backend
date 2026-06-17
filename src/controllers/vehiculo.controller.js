const vehiculoService = require("../services/vehiculo.service");

exports.obtenerTodos = async (req, res) => {
  try {
    const vehiculos = await vehiculoService.obtenerTodos();
    res.json({ success: true, data: vehiculos });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.obtenerPorId(req.params.id);
    res.json({ success: true, data: vehiculo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.crearVehiculo(req.body);
    res
      .status(201)
      .json({ success: true, message: "Vehículo creado", data: vehiculo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.actualizarVehiculo(
      req.params.id,
      req.body,
    );
    res.json({
      success: true,
      message: "Vehículo actualizado",
      data: vehiculo,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    await vehiculoService.eliminarVehiculo(req.params.id);
    res.json({ success: true, message: "Vehículo eliminado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
