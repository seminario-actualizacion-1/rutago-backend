const { body, validationResult } = require("express-validator");

const manejarErroresValidacion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: errors.array().map((err) => ({
        campo: err.path,
        mensaje: err.msg,
      })),
    });
  }
  next();
};

const validarCrearViaje = [
  body("barrioOrigenId")
    .notEmpty().withMessage("El barrio de origen es obligatorio")
    .isInt({ min: 1 }).withMessage("El barrio de origen debe ser un número entero positivo"),

  body("barrioDestinoId")
    .notEmpty().withMessage("El barrio de destino es obligatorio")
    .isInt({ min: 1 }).withMessage("El barrio de destino debe ser un número entero positivo"),

  manejarErroresValidacion,
];

module.exports = { validarCrearViaje };
