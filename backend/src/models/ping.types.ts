import type { Ping } from "../generated/prisma/client.js";

export type CreatePingDTO = Pick<Ping, 'toUserId' | 'fromUserId' | 'note' | 'spotifyTrackId'>;

export type CreatePingRequestDTO = Pick<Ping, 'toUserId' | 'note'> & {
  spotifyUrl: string
};

