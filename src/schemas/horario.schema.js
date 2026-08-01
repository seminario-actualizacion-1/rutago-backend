const { z } = require("zod");

const crear = z.object({
  rutaId: z.coerce
    .number({ required_error: "La ruta es obligatoria" })
    .int()
    .positive("La ruta debe ser un número entero positivo"),
  horaSalida: z
    .string({ required_error: "La hora de salida es obligatoria" })
    .trim()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/,
      "La hora de salida debe tener formato HH:mm o HH:mm:ss",
    ),
  frecuenciaMinutos: z.coerce.number().int().positive().optional(),
  fechaInicio: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha de inicio debe tener formato YYYY-MM-DD",
    )
    .optional(),
  fechaFin: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha de fin debe tener formato YYYY-MM-DD",
    )
    .optional(),
});

const actualizar = z.object({
  rutaId: z.coerce.number().int().positive().optional(),
  horaSalida: z
    .string()
    .trim()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
    .optional(),
  frecuenciaMinutos: z.coerce.number().int().positive().optional(),
  fechaInicio: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  fechaFin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

module.exports = { crear, actualizar };
