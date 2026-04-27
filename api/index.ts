import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server/api-server.js';
import { runMigrations } from '../server/migrate.js';

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
