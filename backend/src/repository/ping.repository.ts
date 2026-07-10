import type { Ping, PrismaClient } from '../generated/prisma/client.js';
import type { CreatePingDTO } from "../models/ping.types.js";

export interface IPingRepository {
  create(input: CreatePingDTO): Promise<Ping>
  findReceived(userId: string): Promise<Ping[]>
  findSent(userId: string): Promise<Ping[]>
  findLatestReceived(userId: string): Promise<Ping | null>
}
export class PingRepository implements IPingRepository {
  constructor(private prisma: PrismaClient) { }

  async create(input: CreatePingDTO) {
    return this.prisma.ping.create({
      data: input
    });
  }

  async findLatestReceived(userId: string) {
    return this.prisma.ping.findFirst({
      where: { toUserId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findReceived(userId: string) {
    return this.prisma.ping.findMany({ where: { toUserId: userId } });
  }

  async findSent(userId: string) {
    return this.prisma.ping.findMany({ where: { fromUserId: userId } });
  }

}
