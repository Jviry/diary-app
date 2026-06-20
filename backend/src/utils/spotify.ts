import { DomainError } from "../common/error/domain.error.js";


export const parseSpotifyTrackId = (url: string): string => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (!match) throw new DomainError('Invalid Spotify URL');
  return match[1];
};

