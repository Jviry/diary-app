import { Router } from "express";
import { prisma } from "../config/prisma";
import { UserRepository } from "../repository/user.repository";
import { UserUsecase } from "../usecase/user.usecase";
import type { Request, Response, NextFunction } from 'express';

const router = Router();

const userRepo = new UserRepository(prisma);
const uc = new UserUsecase(userRepo);

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uc.register(req.body);
    res.status(201).json({
      message: 'User created',
      user: result
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
      user: result
    });
  } catch (error) {
    next(error);
  }
});

export default router;
