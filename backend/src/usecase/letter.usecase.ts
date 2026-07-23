import { DomainError } from '../common/error/domain.error.js';
import type { Letter } from '../generated/prisma/client.js';
import type { CreateLetterRequestDTO, FindReceivedOptions, PaginatedLetters } from '../models/letter.types.js';
import type { ILetterRepository } from '../repository/letter.repository.js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { parseSpotifyTrackId } from '../utils/spotify.js';

export class LetterUsecase {
  constructor(private repo: ILetterRepository, private storage: SupabaseClient) { }

  async create(input: CreateLetterRequestDTO, fromUserId: string, files?: Express.Multer.File[]): Promise<Letter> {
    const { spotifyUrl, ...rest } = input;
    let trackId: string | null = null;
    if (spotifyUrl) {
      trackId = parseSpotifyTrackId(spotifyUrl);
    }

    const letter = await this.repo.create({ ...rest, fromUserId, spotifyTrackId: trackId });

    if (files && files.length > 0) {
      for (const file of files) {
        const s3key = `letters/${letter.id}/${Date.now()}-${file.originalname}`;

        const { error } = await this.storage.storage
          .from('letter-images')
          .upload(s3key, file.buffer, {
            contentType: file.mimetype
          });
        if (error) {
          console.log('Supabase upload error:', error)  // add this
          throw new DomainError('Failed to upload image')
        }
        if (error) throw new DomainError('Failed to upload image');

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

  async getSent(userId: string, page: number, limit: number): Promise<PaginatedLetters> {
    return this.repo.findSent(userId, page, limit);
  }

  async getReceived(userId: string, options: FindReceivedOptions): Promise<PaginatedLetters> {
    return this.repo.findReceived(userId, options);
  }

  async getLatestReceived(userId: string): Promise<Letter | null> {
    return this.repo.findLatestReceived(userId);
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
