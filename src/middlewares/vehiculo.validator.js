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

const validarCrearVehiculo = [
  body("placa")
    .trim()
    .notEmpty().withMessage("La placa es obligatoria")
    .isLength({ min: 5, max: 20 }).withMessage("La placa debe tener entre 5 y 20 caracteres"),

  body("marca")
    .trim()
    .notEmpty().withMessage("La marca es obligatoria")
    .isLength({ min: 2, max: 100 }).withMessage("La marca debe tener entre 2 y 100 caracteres"),

  body("modelo")
    .trim()
    .notEmpty().withMessage("El modelo es obligatorio")
    .isLength({ min: 1, max: 50 }).withMessage("El modelo debe tener entre 1 y 50 caracteres"),

  body("color")
    .trim()
    .notEmpty().withMessage("El color es obligatorio")
    .isLength({ min: 3, max: 50 }).withMessage("El color debe tener entre 3 y 50 caracteres"),

  body("capacidadPasajeros")
    .notEmpty().withMessage("La capacidad de pasajeros es obligatoria")
    .isInt({ min: 1 }).withMessage("La capacidad debe ser un número entero positivo"),

  body("entidadId")
    .notEmpty().withMessage("La entidad es obligatoria")
    .isInt({ min: 1 }).withMessage("La entidad debe ser un número entero positivo"),

  body("estadoId")
    .notEmpty().withMessage("El estado es obligatorio")
    .isInt({ min: 1 }).withMessage("El estado debe ser un número entero positivo"),

  body("latitud")
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage("La latitud debe ser un número entre -90 y 90"),

  body("longitud")
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage("La longitud debe ser un número entre -180 y 180"),

  manejarErroresValidacion,
];

const validarActualizarVehiculo = [
  body("placa")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 5, max: 20 }).withMessage("La placa debe tener entre 5 y 20 caracteres"),

  body("marca")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("La marca debe tener entre 2 y 100 caracteres"),

  body("modelo")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage("El modelo debe tener entre 1 y 50 caracteres"),

  body("color")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage("El color debe tener entre 3 y 50 caracteres"),

  body("capacidadPasajeros")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La capacidad debe ser un número entero positivo"),

  body("entidadId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("La entidad debe ser un número entero positivo"),

  body("estadoId")
    .optional({ values: "falsy" })
    .isInt({ min: 1 }).withMessage("El estado debe ser un número entero positivo"),

  body("latitud")
    .optional({ values: "falsy" })
    .isFloat({ min: -90, max: 90 }).withMessage("La latitud debe ser un número entre -90 y 90"),

  body("longitud")
    .optional({ values: "falsy" })
    .isFloat({ min: -180, max: 180 }).withMessage("La longitud debe ser un número entre -180 y 180"),

  manejarErroresValidacion,
];

module.exports = { validarCrearVehiculo, validarActualizarVehiculo };
