import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('raw token received:', token)  // add this

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    console.log('decoded:', decoded)  // add this
    req.userId = decoded.userId;
    console.log('req.userId after setting:', req.userId)  // and this
    next();
  } catch (error) {
    console.log('JWT verify error:', error)  // and this
    return res.status(401).json({ message: 'Invalid token' });
  }
}
