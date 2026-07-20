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

const validarCrearRuta = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la ruta es obligatorio")
    .isLength({ min: 2, max: 200 }).withMessage("El nombre debe tener entre 2 y 200 caracteres"),

  body("origenId")
    .notEmpty().withMessage("La comuna de origen es obligatoria")
    .isInt({ min: 1 }).withMessage("La comuna de origen debe ser un número entero positivo"),

  body("destinoId")
    .notEmpty().withMessage("La comuna de destino es obligatoria")
    .isInt({ min: 1 }).withMessage("La comuna de destino debe ser un número entero positivo"),

  body("descripcion")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no debe exceder 500 caracteres"),

  body("distanciaKm")
    .optional()
    .isFloat({ min: 0.1 }).withMessage("La distancia debe ser un número positivo"),

  body("tiempoEstimadoMinutos")
    .optional()
    .isInt({ min: 1 }).withMessage("El tiempo estimado debe ser un número entero positivo"),

  manejarErroresValidacion,
];

const validarActualizarRuta = [
  body("nombre")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage("El nombre debe tener entre 2 y 200 caracteres"),

  body("origenId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La comuna de origen debe ser un número entero positivo"),

  body("destinoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La comuna de destino debe ser un número entero positivo"),

  body("descripcion")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no debe exceder 500 caracteres"),

  body("distanciaKm")
    .optional({ values: "falsy" })
    .isFloat({ min: 0.1 }).withMessage("La distancia debe ser un número positivo"),

  body("tiempoEstimadoMinutos")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El tiempo estimado debe ser un número entero positivo"),

  manejarErroresValidacion,
];

module.exports = { validarCrearRuta, validarActualizarRuta };
