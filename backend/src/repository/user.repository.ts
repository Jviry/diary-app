import type { PrismaClient } from '../generated/prisma/client';
import type { RegisterInput } from '../models/user.types';

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

