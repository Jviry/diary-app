import type { Request, Response, NextFunction } from 'express';
import { DomainError } from '../error/domain.error.js';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof DomainError) {
    return res.status(400).json({ message: error.message });
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
