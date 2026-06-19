import type { Express } from "express";
import authRouter from './auth.controller.js';
import letterRouter from './letter.controller.js';
import pingRouter from './ping.controller.js';

export const appController = (app: Express) => {
  app.use('/auth', authRouter);
  app.use('/letters', letterRouter);
  app.use('/pings', pingRouter);
}
