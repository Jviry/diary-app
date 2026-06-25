import { Router } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../common/middleware/auth.middleware.js";
import type { Response, NextFunction } from "express";
import { PartnerUsecase } from "../usecase/partner.usecase.js";
import { PartnerRepository } from "../repository/partner.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { authenticate } from "../common/middleware/auth.middleware.js";
import { DomainError } from "../common/error/domain.error.js";

const router = Router();

const partnerRepo = new PartnerRepository(prisma);
const userRepo = new UserRepository(prisma);
const uc = new PartnerUsecase(partnerRepo, userRepo);

router.get('/request/received', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await uc.getPartnerRequests(req.userId!);

    res.status(200).json({
      message: 'Received partner requests retrieved',
      partnerRequests: result
    });
  } catch (error) {
    next(error);
  }
});

router.get('/request/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const result = await uc.getPartnerRequest(id, req.userId!);

    res.status(200).json({
      message: 'Partner req received',
      partnerRequest: result
    });
  } catch (error) {
    next(error);
  }
});

router.post('/request', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { toUserId } = req.body as { toUserId: string };
    if (!toUserId) {
      throw new DomainError('Recipient user ID is required');
    }

    const result = await uc.requestPartner({
      fromUserId: req.userId!,
      toUserId
    });

    res.status(201).json({
      message: 'Partner request sent successfully',
      partnerRequest: result
    });
  } catch (error) {
    next(error);
  }
});

router.put('/request/:id/accept', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    const request = await partnerRepo.findById(id);
    if (!request) {
      throw new DomainError('Partner request not found');
    }

    if (request.toUserId !== req.userId) {
      throw new DomainError('You cannot accept this request');
    }

    const result = await uc.acceptPartnerRequest(id, request.toUserId, request.fromUserId);

    res.status(200).json({
      message: 'Partner request accepted successfully',
      partnerRequest: result
    });
  } catch (error) {
    next(error);
  }
});

router.put('/request/:id/reject', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    await uc.rejectPartnerRequest(id, req.userId!);

    res.status(200).json({
      message: 'Partner request rejected successfully'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/request/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    const request = await partnerRepo.findById(id);
    if (!request) {
      throw new DomainError('Partner request not found');
    }

    if (request.fromUserId === req.userId) {
      await uc.deletePartnerRequest(id, req.userId!);
      res.status(200).json({
        message: 'Partner request cancelled successfully'
      });
    } else if (request.toUserId === req.userId) {
      await uc.rejectPartnerRequest(id, req.userId!);
      res.status(200).json({
        message: 'Partner request rejected successfully'
      });
    } else {
      throw new DomainError('You are not authorized to cancel or reject this request');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await userRepo.findById(req.userId!);
    if (!user) {
      throw new DomainError('User not found');
    }

    if (!user.partnerId) {
      throw new DomainError('You do not have a partner to remove');
    }

    await uc.removePartner(req.userId!, user.partnerId);

    res.status(200).json({
      message: 'Partner removed successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
