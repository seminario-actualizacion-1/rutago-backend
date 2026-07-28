const { z } = require("zod");

const crear = z.object({
  nombre: z
    .string({ required_error: "El nombre del barrio es obligatorio" })
    .trim()
    .min(2, "El nombre debe tener entre 2 y 100 caracteres")
    .max(100, "El nombre debe tener entre 2 y 100 caracteres"),
  comunaId: z.coerce
    .number({ required_error: "La comuna es obligatoria" })
    .int()
    .positive("La comuna debe ser un número entero positivo"),
});

const actualizar = z.object({
  nombre: z.string().trim().min(2).max(100).optional(),
  comunaId: z.coerce.number().int().positive().optional(),
});

module.exports = { crear, actualizar };
