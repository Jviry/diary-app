import { Router } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../common/middleware/auth.middleware.js";
import type { Response, NextFunction } from "express";
import { authenticate } from "../common/middleware/auth.middleware.js";
import { UserRepository } from "../repository/user.repository.js";
import { UserUsecase } from "../usecase/user.usecase.js";

const router = Router();
const userRepo = new UserRepository(prisma);
const uc = new UserUsecase(userRepo);

router.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await uc.findById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const user = await uc.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
