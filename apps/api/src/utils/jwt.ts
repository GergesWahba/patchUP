import jwt, { type SignOptions } from 'jsonwebtoken';
import type { AuthUser } from '@patchup/shared';
import { env } from '../config/env.js';

export function signToken(payload: AuthUser) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  } satisfies SignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthUser;
}
