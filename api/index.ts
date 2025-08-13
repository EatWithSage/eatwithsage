import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

const app = express();
// app.use(...); app.get('/api/hello', ...); etc.

// IMPORTANT: no app.listen() on Vercel
export default (req: VercelRequest, res: VercelResponse) => app(req, res);
