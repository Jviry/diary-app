import { DomainError } from '../common/error/domain.error.js';
import { PartnerRequest } from '../generated/prisma/client.js';
import { PartnerRequestInput, PartnerRequestStatus } from '../models/partner.types.js';
import type { PartnerRepository } from '../repository/partner.repository.js';
import type { UserRepository } from '../repository/user.repository.js';

export class PartnerUsecase {
  constructor(private repo: PartnerRepository, private userRepo: UserRepository) { }

  async requestPartner(input: PartnerRequestInput): Promise<PartnerRequest> {
    const { fromUserId, toUserId } = input;

    if (!toUserId) {
      throw new DomainError('Recipient user ID is required');
    }

    const sender = await this.userRepo.findById(fromUserId);
    const receiver = await this.userRepo.findById(toUserId);
    if (!receiver) throw new DomainError('User not found');
    if (sender?.partnerId) throw new DomainError('You already have a partner');
    if (receiver?.partnerId) throw new DomainError('This user already has a partner');

    const existing = await this.repo.findByUsers(fromUserId, toUserId);
    if (existing) throw new DomainError('Partner request already sent');

    return await this.repo.create({ fromUserId, toUserId });
  }

  async acceptPartnerRequest(id: string, userId: string): Promise<PartnerRequest> {
    const request = await this.repo.findById(id);
    if (!request) throw new DomainError('Partner request not found');

    if (request.toUserId !== userId) {
      throw new DomainError('You cannot accept this request');
    }

    if (request.status === PartnerRequestStatus.ACCEPTED) throw new DomainError('Request already accepted');

    const userA = await this.userRepo.findById(request.toUserId)
    const userB = await this.userRepo.findById(request.fromUserId)
    if (userA?.partnerId) throw new DomainError('You already have a partner')
    if (userB?.partnerId) throw new DomainError('This user already has a partner')

    await this.repo.linkUsers(request.toUserId, request.fromUserId);
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


  async removePartner(userId: string): Promise<void> {

    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new DomainError('User not found');
    }

    if (!user.partnerId) {
      throw new DomainError('You do not have a partner to remove');
    }

    await this.repo.unlinkUsers(userId, user.partnerId);
  }

  async deletePartnerRequest(id: string, userId: string): Promise<boolean> {
    const request = await this.repo.findById(id);
    if (!request) throw new DomainError('Partner request not found');

    if (request.status === PartnerRequestStatus.ACCEPTED) {
      throw new DomainError('You cannot cancel/reject a request that has already been accepted');
    }

    if (request.fromUserId !== userId && request.toUserId !== userId) {
      throw new DomainError('You are not authorized to cancel or reject this request');
    }

    await this.repo.delete(id);
    return request.fromUserId === userId;
  }
}
