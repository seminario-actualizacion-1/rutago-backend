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

const validarCrearPerfilConductor = [
  body("usuarioId")
    .notEmpty().withMessage("El usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El usuario debe ser un número entero positivo"),

  body("licenciaConducir")
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage("La licencia no debe exceder 50 caracteres"),

  body("vehiculoId")
    .optional({ values: "null" })
    .isInt({ min: 1 }).withMessage("El vehículo debe ser un número entero positivo"),

  body("estadoId")
    .optional({ values: "null" })
    .isInt({ min: 1 }).withMessage("El estado debe ser un número entero positivo"),

  manejarErroresValidacion,
];

const validarActualizarPerfilConductor = [
  body("licenciaConducir")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 50 }).withMessage("La licencia no debe exceder 50 caracteres"),

  body("vehiculoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El vehículo debe ser un número entero positivo"),

  body("estadoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El estado debe ser un número entero positivo"),

  manejarErroresValidacion,
];

module.exports = { validarCrearPerfilConductor, validarActualizarPerfilConductor };
