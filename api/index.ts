import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server/api-server';
import { runMigrations } from '../server/migrate';

let initialized = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!initialized) {
    try {
      await runMigrations();
    } catch (err) {
      console.error('Migration failed (continuing):', err);
    }
    initialized = true;
  }
  return app(req as any, res as any);
};
