import { DomainError } from '../common/error/domain.error';
import type { Letter } from '../generated/prisma/client';
import type { LetterInput } from '../models/letter.types';
import type { LetterRepository } from '../repository/letter.repository';

export class LetterUsecase {
  constructor(private repo: LetterRepository) { }

  async create(input: LetterInput, fromUserId: string, files?: Express.Multer.File[]): Promise<Letter> {
    const letter = await this.repo.create(input, fromUserId);

    if (files && files.length > 0) {
      for (const file of files) {
        const s3key = `letters/${letter.id}/${file.originalname}`;
        await this.repo.addImage(letter.id, s3key);
      }
    }

    return letter;
  }

  async getById(id: string, userId: string): Promise<Letter> {
    const letter = await this.repo.findById(id);

    if (!letter) throw new DomainError('Letter not found');
    if (letter.toUserId !== userId && letter.fromUserId !== userId) {
      throw new DomainError('You are not allowed to see this letter');
    }

    return letter;
  }

  async getSent(userId: string): Promise<Letter[]> {
    return this.repo.findSent(userId);
  }

  async getReceived(userId: string): Promise<Letter[]> {
    return this.repo.findRecieved(userId);
  }

  async markAsRead(id: string, userId: string): Promise<Letter> {
    const letter = await this.repo.findById(id);

    if (!letter) throw new DomainError('Letter not found');
    if (letter.toUserId !== userId) {
      throw new DomainError('You are not allowed to mark this letter as read');
    }

    return this.repo.markAsRead(id);
  }

  async delete(id: string, userId: string): Promise<void> {
    const letter = await this.repo.findById(id);

    if (!letter) throw new DomainError('Letter not found');
    if (letter.fromUserId !== userId) {
      throw new DomainError('You are not allowed to delete this letter');
    }

    await this.repo.delete(id);

    return;
  }

}
