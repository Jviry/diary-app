export interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: { images: { url: string }[] }
  preview_url: string
}

export interface SongOut {
  spotifyTrackId: string
  songName: string
  artist: string
  albumArtUrl: string
  previewUrl: string
}
