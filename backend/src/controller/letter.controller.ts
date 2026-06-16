import { Router } from "express";
import { prisma } from "../config/prisma";
import type { AuthRequest } from "../common/middleware/auth.middleware";
import type { Response, NextFunction } from "express";
import { LetterUsecase } from "../usecase/letter.usecase";
import { LetterRepository } from "../repository/letter.repository";
import { authenticate } from "../common/middleware/auth.middleware";
import multer from "multer";

const router = Router();

const letterRepo = new LetterRepository(prisma);
const uc = new LetterUsecase(letterRepo);
const upload = multer({ storage: multer.memoryStorage() })

router.get('/sent', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getSent(req.userId!);

    res.status(200).json({
      message: 'Sent Letters retrieved successfully',
      letters: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/received', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getReceived(req.userId!);

    res.status(200).json({
      message: 'Received Letters retrieved successfully',
      letters: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const result = await uc.getById(id, req.userId!);

    res.status(200).json({
      message: 'Letter retrieved successfully',
      letter: result
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, upload.array('images'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.create(req.body, req.userId!, req.files as Express.Multer.File[]);
    res.status(201).json({
      message: 'Letter sent successfully',
      letter: result
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const result = await uc.markAsRead(id, req.userId!);
    res.status(200).json({
      message: 'Marked as read',
      letter: result
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    await uc.delete(id, req.userId!);
    res.status(200).json({
      message: 'Letter deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
