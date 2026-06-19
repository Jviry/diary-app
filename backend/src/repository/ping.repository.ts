import type { PrismaClient } from "@prisma/client/extension";
import type { CreatePingData } from "../models/ping.types.js";

export class PingRepository {
  constructor(private prisma: PrismaClient) { }

  async create(input: CreatePingData) {
    return this.prisma.ping.create({
      data: input
    });
  }

  async findReceived(userId: string) {
    return this.prisma.ping.findMany({ where: { toUserId: userId } });
  }

  async findSent(userId: string) {
    return this.prisma.ping.findMany({ where: { fromUserId: userId } });
  }

}
