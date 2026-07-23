import type { Letter, LetterImage, PrismaClient } from "../generated/prisma/client.js";
import type { CreateLetterDTO, FindReceivedOptions, PaginatedLetters } from "../models/letter.types.js";

export interface ILetterRepository {
  findById(id: string): Promise<(Letter & { images: LetterImage[] }) | null>
  findSent(userId: string, page: number, limit: number): Promise<PaginatedLetters>
  findReceived(userId: string, options: FindReceivedOptions): Promise<PaginatedLetters>
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

  async findSent(user_id: string, page: number = 1, limit: number = 6) {
    const skip = (page - 1) * limit;

    const [letters, total] = await this.prisma.$transaction([
      this.prisma.letter.findMany({
        where: { toUserId: user_id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.letter.count({
        where: { fromUserId: user_id }
      })
    ]);

    return {
      letters,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findLatestReceived(userId: string) {
    return this.prisma.letter.findFirst({
      where: { toUserId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        fromUser: {
          select: { id: true, name: true }
        }
      }
    });
  }
  async findReceived(user_id: string, { page, limit, unreadOnly }: FindReceivedOptions) {
    const where = { toUserId: user_id, ...(unreadOnly ? { isRead: false } : {}) };

    const skip = (page - 1) * limit

    const [letters, total] = await this.prisma.$transaction([
      this.prisma.letter.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          fromUser: {
            select: { id: true, name: true }
          }
        }
      }),
      this.prisma.letter.count({ where })
    ]);

    return {
      letters,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
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
