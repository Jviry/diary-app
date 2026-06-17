import { DomainError } from "../common/error/domain.error.js";
import type { SpotifyTrack, SongOut } from "../models/song.types.js";


export const parseSpotifyTrackId = (url: string): string => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (!match) throw new DomainError('Invalid Spotify URL');
  return match[1];
};

export const getSpotifyToken = async (): Promise<string> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  });

  const data = await response.json() as { access_token: string };

  return data.access_token;
}

export const getSpotifyTrack = async (spotifyUrl: string): Promise<SongOut> => {
  const trackId = parseSpotifyTrackId(spotifyUrl);
  const token = await getSpotifyToken();

  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const data = await response.json() as SpotifyTrack;

  return {
    spotifyTrackId: trackId,
    songName: data.name,
    artist: data.artists[0].name,
    albumArtUrl: data.album.images[0].url,
    previewUrl: data.preview_url
  }
}
