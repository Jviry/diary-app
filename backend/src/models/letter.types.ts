import type { Letter } from '../generated/prisma/client.js';

export type CreateLetterRequestDTO = Pick<Letter, 'toUserId' | 'title' | 'content'> & {
  spotifyUrl?: string
};

export type CreateLetterDTO = Pick<Letter, 'fromUserId' | 'toUserId' | 'title' | 'content' | 'spotifyTrackId'>;

export interface FindReceivedOptions {
  page: number
  limit: number
  unreadOnly?: boolean
}

export interface PaginatedLetters {
  letters: Letter[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
