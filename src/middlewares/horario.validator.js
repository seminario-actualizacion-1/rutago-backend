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

const validarCrearHorario = [
  body("rutaId")
    .notEmpty().withMessage("La ruta es obligatoria")
    .isInt({ min: 1 }).withMessage("La ruta debe ser un número entero positivo"),

  body("vehiculoId")
    .notEmpty().withMessage("El vehículo es obligatorio")
    .isInt({ min: 1 }).withMessage("El vehículo debe ser un número entero positivo"),

  body("horaSalida")
    .trim()
    .notEmpty().withMessage("La hora de salida es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/).withMessage("La hora de salida debe tener formato HH:mm o HH:mm:ss"),

  body("frecuenciaMinutos")
    .optional()
    .isInt({ min: 1 }).withMessage("La frecuencia debe ser un número entero positivo"),

  manejarErroresValidacion,
];

const validarActualizarHorario = [
  body("rutaId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La ruta debe ser un número entero positivo"),

  body("vehiculoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El vehículo debe ser un número entero positivo"),

  body("horaSalida")
    .optional({ values: "falsy" })
    .trim()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/).withMessage("La hora de salida debe tener formato HH:mm o HH:mm:ss"),

  body("frecuenciaMinutos")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La frecuencia debe ser un número entero positivo"),

  manejarErroresValidacion,
];

module.exports = { validarCrearHorario, validarActualizarHorario };
