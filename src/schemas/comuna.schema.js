const { z } = require("zod");

const crear = z.object({
  nombre: z
    .string({ required_error: "El nombre de la comuna es obligatorio" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
});

const actualizar = z.object({
  nombre: z.string().trim().min(2).max(100).optional(),
});

module.exports = { crear, actualizar };
