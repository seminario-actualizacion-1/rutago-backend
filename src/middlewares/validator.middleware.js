const validarSchema = (schema, source = "body") => (req, res, next) => {
  try {
    req[source] = schema.parse(req[source]);
    next();
  } catch (error) {
    const issues = error.issues || error.errors || [];
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: issues.map((e) => ({
        campo: (e.path || []).join("."),
        mensaje: e.message,
      })),
    });
  }
};

module.exports = { validarSchema };
