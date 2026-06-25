import { DomainError } from '../common/error/domain.error.js';
import { PartnerRequest } from '../generated/prisma/client.js';
import { PartnerRequestInput, PartnerRequestStatus } from '../models/partner.types.js';
import type { PartnerRepository } from '../repository/partner.repository.js';
import type { UserRepository } from '../repository/user.repository.js';

export class PartnerUsecase {
  constructor(private repo: PartnerRepository, private userRepo: UserRepository) { }

  async requestPartner(input: PartnerRequestInput): Promise<PartnerRequest> {
    const { fromUserId, toUserId } = input;

    const sender = await this.userRepo.findById(fromUserId);
    const receiver = await this.userRepo.findById(toUserId);
    if (!receiver) throw new DomainError('User not found');
    if (sender?.partnerId) throw new DomainError('You already have a partner');
    if (receiver?.partnerId) throw new DomainError('This user already has a partner');

    const existing = await this.repo.findByUsers(fromUserId, toUserId);
    if (existing) throw new DomainError('Partner request already sent');

    return await this.repo.create({ fromUserId, toUserId });
  }

  async acceptPartnerRequest(id: string, userAId: string, userBId: string): Promise<PartnerRequest> {
    const request = await this.repo.findById(id);
    if (!request) throw new DomainError('Partner request not found');
    if (request.status === PartnerRequestStatus.ACCEPTED) throw new DomainError('Request already accepted');

    const userA = await this.userRepo.findById(userAId)
    const userB = await this.userRepo.findById(userBId)
    if (userA?.partnerId) throw new DomainError('You already have a partner')
    if (userB?.partnerId) throw new DomainError('This user already has a partner')

    await this.repo.linkUsers(userAId, userBId);
    return this.repo.updateStatus(id, PartnerRequestStatus.ACCEPTED);
  }

  async getPartnerRequests(userId: string): Promise<PartnerRequest[]> {
    return this.repo.findReceived(userId);
  }

  async getPartnerRequest(id: string, userId: string): Promise<PartnerRequest> {
    const request = await this.repo.findById(id)
    if (!request) throw new DomainError('Partner request not found')
    if (request.toUserId !== userId && request.fromUserId !== userId) {
      throw new DomainError('You are not allowed to view this request')
    }
    return request
  }

  async rejectPartnerRequest(id: string, userId: string): Promise<void> {
    const request = await this.repo.findById(id);
    if (!request) throw new DomainError('Partner request not found');
    if (request.toUserId !== userId) throw new DomainError('You cannot reject this request');
    await this.repo.delete(id);
  }

  async removePartner(userAId: string, userBId: string): Promise<void> {
    await this.repo.unlinkUsers(userAId, userBId);
  }

  async deletePartnerRequest(id: string, userId: string): Promise<void> {
    const request = await this.repo.findById(id);
    if (!request) throw new DomainError('Partner request not found');
    if (request.fromUserId !== userId) throw new DomainError('You cannot cancel this request');
    await this.repo.delete(id);
  }
}
