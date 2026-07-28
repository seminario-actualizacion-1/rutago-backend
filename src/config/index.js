require("dotenv").config();
const { z } = require("zod");

const envSchema = z.object({
  PORT: z.string(),
  API_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  HOST: z.string(),
  PORT_DB: z.string(),
  USER_DB: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN es obligatorio"),
  FRONTEND_URL: z.string().url().optional(),
  JWT_SECRET: z
    .string()
    .min(10, "JWT_SECRET debe tener al menos 10 caracteres"),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("\n Variables de entorno inválidas:");
  for (const err of parsed.error.errors) {
    console.error(`   ${err.path.join(".")}: ${err.message}`);
  }
  console.error();
  process.exit(1);
}

module.exports = {
  puerto: parsed.data.PORT,
  apiUrl: parsed.data.API_URL,
  entorno: parsed.data.NODE_ENV,

  jwt: {
    secreto: parsed.data.JWT_SECRET,
    expiracion: parsed.data.JWT_EXPIRES_IN,
    refreshExpiracion: parsed.data.JWT_REFRESH_EXPIRES_IN,
  },

  db: {
    host: parsed.data.HOST,
    puerto: parsed.data.PORT_DB,
    usuario: parsed.data.USER_DB,
    password: parsed.data.DB_PASSWORD,
    nombre: parsed.data.DB_NAME,
  },

  cors: {
    origen: parsed.data.CORS_ORIGIN,
  },
};
