const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.message?.includes("_NO_ENCONTRADO") || err.message?.includes("_NO_ENCONTRADA")) {
    return res.status(404).json({ success: false, message: "Recurso no encontrado" });
  }

  if (err.message === "TOKEN_INVALIDO_O_EXPIRADO") {
    return res.status(400).json({ success: false, message: "Token inválido o expirado" });
  }

  res.status(500).json({ success: false, message: "Error interno del servidor" });
};

module.exports = errorHandler;
