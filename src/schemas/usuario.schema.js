const { z } = require("zod");

const registro = z.object({
  nombres: z
    .string({ required_error: "El nombre es obligatorio" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  apellidos: z
    .string({ required_error: "Los apellidos son obligatorios" })
    .trim()
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(50, "Los apellidos no pueden exceder 50 caracteres"),
  correo: z
    .string({ required_error: "El correo es obligatorio" })
    .trim()
    .email("Debe proporcionar un correo electrónico válido")
    .transform((v) => v.toLowerCase()),
  contrasena: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rolId: z.coerce.number().int().positive().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  tipoDocumentoId: z.coerce.number().int().positive().optional(),
  numeroDocumento: z.string().optional(),
  fechaNacimiento: z.string().optional(),
});

const actualizarPerfil = z.object({
  nombres: z.string().trim().min(2).max(50).optional(),
  apellidos: z.string().trim().min(2).max(50).optional(),
  correo: z
    .string()
    .trim()
    .email()
    .transform((v) => v.toLowerCase())
    .optional(),
  contrasena: z.string().min(6).optional(),
  rolId: z.coerce.number().int().positive().optional(),
});

const recuperarContrasena = z.object({
  correo: z
    .string({ required_error: "El correo es obligatorio" })
    .trim()
    .email("Debe proporcionar un correo electrónico válido")
    .transform((v) => v.toLowerCase()),
});

const cambiarContrasena = z.object({
  token: z
    .string({ required_error: "El token es obligatorio" })
    .min(1, "El token es obligatorio"),
  nuevaContrasena: z
    .string({ required_error: "La nueva contraseña es obligatoria" })
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

const cambiarRol = z.object({
  rolId: z.coerce
    .number({ required_error: "El rol es obligatorio" })
    .int("El rol debe ser un número entero")
    .positive("El rol debe ser un número positivo"),
});

module.exports = {
  registro,
  actualizarPerfil,
  recuperarContrasena,
  cambiarContrasena,
  cambiarRol,
};
