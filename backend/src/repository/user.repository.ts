import type { User, PrismaClient } from '../generated/prisma/client.js';
import type { RegisterRequestDTO, UserWithPartner } from '../models/user.types.js';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<UserWithPartner | null>
  create(input: RegisterRequestDTO): Promise<User>
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) { }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        partner: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async create(input: RegisterRequestDTO) {
    return this.prisma.user.create({
      data: input
    });
  }
}

