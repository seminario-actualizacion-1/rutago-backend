const { body, validationResult } = require("express-validator");

const manejarErroresValidacion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: errors.array(),
    });
  }
  next();
};

const validarCrearViaje = [
  body("rutaId")
    .notEmpty().withMessage("La ruta es obligatoria")
    .isInt({ min: 1 }).withMessage("La ruta debe ser un número entero positivo"),
  body("horarioId")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("El horario debe ser un número entero positivo"),
  body("precioEstimado")
    .optional({ nullable: true })
    .isFloat({ min: 0 }).withMessage("El precio estimado debe ser un número positivo"),
  manejarErroresValidacion,
];

module.exports = { validarCrearViaje };
