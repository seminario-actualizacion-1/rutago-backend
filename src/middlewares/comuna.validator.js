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

const validarCrearComuna = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la comuna es obligatorio")
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  manejarErroresValidacion,
];

const validarActualizarComuna = [
  body("nombre")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  manejarErroresValidacion,
];

module.exports = { validarCrearComuna, validarActualizarComuna };
