const { query, validationResult } = require("express-validator");

/**
 * Middleware para manejar los errores de validación de paginación
 */
const manejarErroresPaginacion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación en parámetros de paginación",
      errors: errors.array().map((err) => ({
        campo: err.path,
        mensaje: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validación de parámetros de paginación
 * Valida que paginaActual y registrosPorPagina sean números válidos
 */
const validarPaginacion = [
  query("paginaActual")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página actual debe ser un número entero mayor o igual a 1")
    .toInt()
    .customSanitizer((value) => (value ? Number(value) : 1)),

  query("registrosPorPagina")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage(
      "Los registros por página deben ser un número entre 1 y 100"
    )
    .toInt()
    .customSanitizer((value) => (value ? Number(value) : 10)),

  manejarErroresPaginacion,
];

/**
 * Middleware para establecer valores por defecto de paginación
 * Si no se envían parámetros, establece paginaActual=1 y registrosPorPagina=10
 */
const establecerPaginacionPorDefecto = (req, res, next) => {
  req.query.paginaActual = req.query.paginaActual
    ? parseInt(req.query.paginaActual)
    : 1;
  req.query.registrosPorPagina = req.query.registrosPorPagina
    ? parseInt(req.query.registrosPorPagina)
    : 10;
  next();
};

module.exports = {
  validarPaginacion,
  establecerPaginacionPorDefecto,
};
