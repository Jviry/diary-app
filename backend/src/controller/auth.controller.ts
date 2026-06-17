import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { UserRepository } from "../repository/user.repository.js";
import { UserUsecase } from "../usecase/user.usecase.js";
import type { Request, Response, NextFunction } from 'express';

const router = Router();

const userRepo = new UserRepository(prisma);
const uc = new UserUsecase(userRepo);

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uc.register(req.body);
    res.status(201).json({
      message: 'User created',
      ...result
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uc.login(req.body);
    res.status(200).json({
      message: 'User logged in',
      ...result
    });
  } catch (error) {
    next(error);
  }
});

export default router;
