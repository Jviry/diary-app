import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DomainError } from '../common/error/domain.error.js';
import type { IUserRepository } from '../repository/user.repository.js';
import type { LoginRequestDTO, RegisterRequestDTO, AuthResponseDTO, UserDTO } from '../models/user.types.js';

export class UserUsecase {
  constructor(private repo: IUserRepository) { }

  async findById(id: string): Promise<UserDTO | null> {
    const user = await this.repo.findById(id);
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name, partner: user.partner ?? null };
  }

  async register(input: RegisterRequestDTO): Promise<AuthResponseDTO> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new DomainError('Email already in use');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await this.repo.create({
      ...input,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return { user: { id: user.id, email: user.email, name: user.name, partner: null }, token };
  }

  async login(input: LoginRequestDTO): Promise<AuthResponseDTO> {
    const authUser = await this.repo.findByEmail(input.email);
    if (!authUser) throw new DomainError('Invalid email or password');

    const isValid = await bcrypt.compare(input.password, authUser.password);
    if (!isValid) throw new DomainError('Invalid email or password');

    const token = jwt.sign(
      { userId: authUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const user = await this.repo.findById(authUser.id);

    return { user: { id: user!.id, email: user!.email, name: user!.name, partner: user!.partner }, token };
  }
}
