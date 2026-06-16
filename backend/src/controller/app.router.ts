import type { Express } from "express";
import authRouter from './auth.controller';
import letterRouter from './letter.controller';

export const appController = (app: Express) => {
  app.use('/auth', authRouter);
  app.use('/letters', letterRouter);
}
