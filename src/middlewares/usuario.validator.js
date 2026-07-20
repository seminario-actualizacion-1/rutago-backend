const { body, validationResult } = require("express-validator");

/**
 * Middleware para manejar los errores de validación
 */
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

/**
 * Validaciones para el registro de usuario
 */
const validarRegistro = [
  body("nombres")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("apellidos")
    .trim()
    .notEmpty()
    .withMessage("Los apellidos son obligatorios")
    .isLength({ min: 2, max: 50 })
    .withMessage("Los apellidos deben tener entre 2 y 50 caracteres"),

  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  body("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("rolId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de rol debe ser un número entero positivo"),

  manejarErroresValidacion,
];

/**
 * Validaciones para el login
 */
const validarLogin = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  body("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 1 })
    .withMessage("La contraseña no puede estar vacía"),

  manejarErroresValidacion,
];

/**
 * Validaciones para recuperar contraseña
 */
const validarRecuperarContrasena = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  manejarErroresValidacion,
];

/**
 * Validaciones para cambiar contraseña
 */
const validarCambiarContrasena = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("El token de recuperación es obligatorio"),

  body("nuevaContrasena")
    .notEmpty()
    .withMessage("La nueva contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La nueva contraseña debe tener al menos 6 caracteres"),

  manejarErroresValidacion,
];

/**
 * Validaciones para actualizar perfil
 */
const validarActualizarPerfil = [
  body("nombres")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("apellidos")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Los apellidos deben tener entre 2 y 50 caracteres"),

  body("correo")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  manejarErroresValidacion,
];

module.exports = {
  validarRegistro,
  validarLogin,
  validarRecuperarContrasena,
  validarCambiarContrasena,
  validarActualizarPerfil,
};
