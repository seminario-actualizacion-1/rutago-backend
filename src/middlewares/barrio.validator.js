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

const validarCrearBarrio = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del barrio es obligatorio")
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("comunaId")
    .notEmpty().withMessage("La comuna es obligatoria")
    .isInt({ min: 1 }).withMessage("La comuna debe ser un número entero positivo"),

  manejarErroresValidacion,
];

const validarActualizarBarrio = [
  body("nombre")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("comunaId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La comuna debe ser un número entero positivo"),

  manejarErroresValidacion,
];

module.exports = { validarCrearBarrio, validarActualizarBarrio };
