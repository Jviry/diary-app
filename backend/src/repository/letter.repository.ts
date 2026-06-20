import type { PrismaClient } from "../generated/prisma/client.js";
import type { CreateLetterData } from "../models/letter.types.js";

export class LetterRepository {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string) {
    return this.prisma.letter.findUnique({ where: { id }, include: { images: true } });
  }

  async findSent(user_id: string) {
    return this.prisma.letter.findMany({ where: { fromUserId: user_id } });
  }

  async findRecieved(user_id: string) {
    return this.prisma.letter.findMany({ where: { toUserId: user_id } });
  }

  async create(input: CreateLetterData) {
    return this.prisma.letter.create({ data: input });
  }

  async addImage(letterId: string, s3Key: string) {
    return this.prisma.letterImage.create({
      data: {
        letterId,
        s3Key
      }
    })
  }

  async markAsRead(id: string) {
    return this.prisma.letter.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async delete(id: string) {
    return this.prisma.letter.delete({ where: { id } });
  }
}
