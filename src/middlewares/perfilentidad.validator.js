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

const validarCrearEntidad = [
  body("usuarioId")
    .notEmpty().withMessage("El usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El usuario debe ser un número entero positivo"),

  body("razonSocial")
    .trim()
    .notEmpty().withMessage("La razón social es obligatoria")
    .isLength({ min: 3, max: 200 }).withMessage("La razón social debe tener entre 3 y 200 caracteres"),

  body("nit")
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage("El NIT no debe exceder 50 caracteres"),

  body("telefonoContacto")
    .optional()
    .trim()
    .isLength({ max: 30 }).withMessage("El teléfono no debe exceder 30 caracteres"),

  manejarErroresValidacion,
];

const validarActualizarEntidad = [
  body("razonSocial")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage("La razón social debe tener entre 3 y 200 caracteres"),

  body("nit")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 50 }).withMessage("El NIT no debe exceder 50 caracteres"),

  body("telefonoContacto")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 30 }).withMessage("El teléfono no debe exceder 30 caracteres"),

  body("nombre")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 200 }).withMessage("El nombre no debe exceder 200 caracteres"),

  body("direccion")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 300 }).withMessage("La dirección no debe exceder 300 caracteres"),

  body("telefono")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 30 }).withMessage("El teléfono no debe exceder 30 caracteres"),

  manejarErroresValidacion,
];

module.exports = { validarCrearEntidad, validarActualizarEntidad };
