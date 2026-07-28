const { z } = require("zod");

const paginacion = z.object({
  paginaActual: z.coerce.number().int().min(1).optional(),
  registrosPorPagina: z.coerce.number().int().min(1).max(100).optional(),
  q: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

module.exports = { paginacion };
