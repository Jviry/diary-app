import type { PrismaClient } from '../generated/prisma/client.js';
import type { PartnerRequestInput, PartnerRequestStatus } from '../models/partner.types.js';

export class PartnerRepository {
  constructor(private prisma: PrismaClient) { }

  async create(input: PartnerRequestInput) {
    return this.prisma.partnerRequest.create({
      data: input
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
