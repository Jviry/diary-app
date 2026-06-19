export interface CreatePingData {
  toUserId: string
  fromUserId: string
  note?: string
  spotifyTrackId: string
  songName: string
  artist: string
  albumArtUrl: string
  previewUrl: string
}

export interface PingInput {
  toUserId: string
  note?: string
  spotifyUrl: string
}
