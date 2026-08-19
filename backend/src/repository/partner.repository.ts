import type { PartnerRequest, PrismaClient } from '../generated/prisma/client.js';
import { PartnerRequestStatus } from '../models/partner.types.js';
import type { CreatePartnerRequestDTO } from '../models/partner.types.js';

export interface IPartnerRepository {
  findById(id: string): Promise<PartnerRequest | null>
  findPendingReceived(toUserId: string): Promise<PartnerRequest[]>
  findByUsers(fromUserId: string, toUserId: string): Promise<PartnerRequest | null>
  create(input: CreatePartnerRequestDTO): Promise<PartnerRequest>
  updateStatus(id: string, status: PartnerRequestStatus): Promise<PartnerRequest>
  linkUsers(userAId: string, userBId: string): Promise<void>
  unlinkUsers(userAId: string, userBId: string): Promise<void>
  delete(id: string): Promise<PartnerRequest>
}

export class PartnerRepository implements IPartnerRepository {
  constructor(private prisma: PrismaClient) { }

  async create(input: CreatePartnerRequestDTO) {
    return this.prisma.partnerRequest.create({
      data: input
    });
  }

  async findPendingReceived(toUserId: string) {
    return this.prisma.partnerRequest.findMany({
      where: { toUserId, status: PartnerRequestStatus.PENDING },
      include: {
        fromUser: {
          select: { id: true, name: true }
        },
        toUser: {
          select: { id: true, name: true }
        }
      }

    });
  }

  async findById(id: string) {
    return this.prisma.partnerRequest.findUnique({ where: { id } })
  }

  async findByUsers(fromUserId: string, toUserId: string) {
    return this.prisma.partnerRequest.findUnique({
      where: { fromUserId_toUserId: { fromUserId, toUserId } }
    })
  }


  async updateStatus(id: string, status: PartnerRequestStatus) {
    return this.prisma.partnerRequest.update({
      where: { id },
      data: { status }
    })

  }

  async linkUsers(userAId: string, userBId: string) {
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userAId }, data: { partnerId: userBId } }),
      this.prisma.user.update({ where: { id: userBId }, data: { partnerId: userAId } }),
    ]);
  }

  async unlinkUsers(userAId: string, userBId: string) {
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userAId }, data: { partnerId: null } }),
      this.prisma.user.update({ where: { id: userBId }, data: { partnerId: null } }),
      this.prisma.partnerRequest.deleteMany({
        where: {
          OR: [
            { fromUserId: userAId, toUserId: userBId },
            { fromUserId: userBId, toUserId: userAId }
          ]
        }
      })
    ])
  }

  async delete(id: string) {
    return this.prisma.partnerRequest.delete({ where: { id } })
  }

}
