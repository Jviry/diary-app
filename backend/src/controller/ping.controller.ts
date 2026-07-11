import { Router } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../common/middleware/auth.middleware.js";
import type { Response, NextFunction } from "express";
import { authenticate } from "../common/middleware/auth.middleware.js";
import { PingRepository } from "../repository/ping.repository.js";
import { PingUsecase } from "../usecase/ping.usecase.js";

const router = Router();
const pingRepo = new PingRepository(prisma);
const uc = new PingUsecase(pingRepo);


router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const result = await uc.create(req.body, req.userId!);

    res.status(200).json({
      message: 'Ping created successfully',
      ping: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/sent', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getSent(req.userId!);

    res.status(200).json({
      message: 'Sent pings retrieved successfully',
      pings: result
    });
  } catch (error) {
    next(error);
  }
})

router.get('/received', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getReceived(req.userId!);

    res.status(200).json({
      message: 'Received pings retrieved successfully',
      pings: result
    });
  } catch (error) {
    next(error);
  }
})

router.get('/latest', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getLatestReceived(req.userId!)
    res.status(200).json({
      message: 'Latest ping retrieved successfully',
      ping: result
    })
  } catch (error) {
    next(error)
  }
})

export default router;
