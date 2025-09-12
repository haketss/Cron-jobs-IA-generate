import { z } from 'zod';
import 'dotenv/config'
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const envSchema = z.object({
  PORT: z.coerce.number().default(port),
  DATABASE_URL: z.string().url().default(process.env.DATABASE_URL ?? ""),
  GEMINI_API_KEY: z.string().default(process.env.GEMINI_API_KEY ?? ""),
});

export const env = envSchema.parse(process.env);
