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

const validarCrearPerfilPasajero = [
  body("usuarioId")
    .notEmpty().withMessage("El usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El usuario debe ser un número entero positivo"),

  body("telefono")
    .optional()
    .trim()
    .isLength({ max: 30 }).withMessage("El teléfono no debe exceder 30 caracteres"),

  body("direccion")
    .optional()
    .trim()
    .isLength({ max: 300 }).withMessage("La dirección no debe exceder 300 caracteres"),

  body("tipoDocumentoId")
    .optional({ values: "null" })
    .isInt({ min: 1 }).withMessage("El tipo de documento debe ser un número entero positivo"),

  body("numeroDocumento")
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage("El número de documento no debe exceder 50 caracteres"),

  body("fechaNacimiento")
    .optional()
    .isISO8601().withMessage("La fecha de nacimiento debe tener formato ISO8601 (YYYY-MM-DD)"),

  manejarErroresValidacion,
];

const validarActualizarPerfilPasajero = [
  body("telefono")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 30 }).withMessage("El teléfono no debe exceder 30 caracteres"),

  body("direccion")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 300 }).withMessage("La dirección no debe exceder 300 caracteres"),

  body("tipoDocumentoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El tipo de documento debe ser un número entero positivo"),

  body("numeroDocumento")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 50 }).withMessage("El número de documento no debe exceder 50 caracteres"),

  body("fechaNacimiento")
    .optional({ values: "falsy" })
    .isISO8601().withMessage("La fecha de nacimiento debe tener formato ISO8601 (YYYY-MM-DD)"),

  manejarErroresValidacion,
];

module.exports = { validarCrearPerfilPasajero, validarActualizarPerfilPasajero };
