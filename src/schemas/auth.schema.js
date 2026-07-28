const { z } = require("zod");

const login = z.object({
  correo: z
    .string({ required_error: "El correo es obligatorio" })
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Debe proporcionar un correo electrónico válido")
    .transform((v) => v.toLowerCase()),
  contrasena: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña no puede estar vacía"),
});

const refresh = z.object({
  refreshToken: z
    .string({ required_error: "El refresh token es obligatorio" })
    .min(1, "El refresh token es obligatorio"),
});

module.exports = { login, refresh };
