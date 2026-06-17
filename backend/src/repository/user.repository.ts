import type { PrismaClient } from '../generated/prisma/client.js';
import type { RegisterInput } from '../models/user.types.js';

export class UserRepository {
  constructor(private prisma: PrismaClient) { }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(input: RegisterInput) {
    return this.prisma.user.create({
      data: input
    })
  }
}

