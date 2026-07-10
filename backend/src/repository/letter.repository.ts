import type { Letter, LetterImage, PrismaClient } from "../generated/prisma/client.js";
import type { CreateLetterDTO } from "../models/letter.types.js";

export interface ILetterRepository {
  findById(id: string): Promise<(Letter & { images: LetterImage[] }) | null>
  findSent(userId: string): Promise<Letter[]>
  findReceived(userId: string): Promise<Letter[]>
  findLatestReceived(userId: string): Promise<Letter | null>
  create(input: CreateLetterDTO): Promise<Letter>
  addImage(letterId: string, s3Key: string): Promise<LetterImage>
  markAsRead(id: string): Promise<Letter>
  delete(id: string): Promise<Letter>
}

export class LetterRepository implements ILetterRepository {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string) {
    return this.prisma.letter.findUnique({ where: { id }, include: { images: true } });
  }

  async findSent(user_id: string) {
    return this.prisma.letter.findMany({ where: { fromUserId: user_id } });
  }

  async findLatestReceived(userId: string) {
    return this.prisma.letter.findFirst({
      where: { toUserId: userId },
      orderBy: { createdAt: 'desc' },
    })
  }
  async findReceived(user_id: string) {
    return this.prisma.letter.findMany({ where: { toUserId: user_id } });
  }

  async create(input: CreateLetterDTO) {
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
