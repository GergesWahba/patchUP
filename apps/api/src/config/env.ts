import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { z } from 'zod';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const envPath = path.resolve(currentDir, '../../.env');

dotenv.config({ path: envPath });

const normalizedEnv = {
  ...process.env,
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI ?? process.env.MONGO_URI,
  JWT_SECRET:
    (process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 16
      ? process.env.JWT_SECRET
      : undefined) ??
    (process.env.NODE_ENV !== 'production' ? 'patchup-local-development-secret' : undefined),
};

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

export const env = envSchema.parse(normalizedEnv);
