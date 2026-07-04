import type { Letter } from '../generated/prisma/client.js';

export type CreateLetterRequestDTO = Pick<Letter, 'toUserId' | 'title' | 'content'> & {
  spotifyUrl?: string
};

export type CreateLetterDTO = Pick<Letter, 'fromUserId' | 'toUserId' | 'title' | 'content' | 'spotifyTrackId'>;
