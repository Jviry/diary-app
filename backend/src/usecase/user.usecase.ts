import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DomainError } from '../common/error/domain.error';
import type { UserRepository } from '../repository/user.repository';
import type { LoginInput, RegisterInput, AuthResponse } from '../models/user.types';

export class UserUsecase {
  constructor(private repo: UserRepository) { }

  async register(input: RegisterInput): Promise<AuthResponse> {
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

    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) throw new DomainError('Invalid email or password');

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new DomainError('Invalid email or password');

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }
}
