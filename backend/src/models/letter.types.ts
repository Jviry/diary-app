export interface LetterInput {
  toUserId: string
  title: string
  content: string
  spotifyTrackId?: string
  songName?: string
  artist?: string
  albumArtUrl?: string
}

export interface PingInput {
  toUserId: string
  note?: string
  spotifyTrackId: string
  songName: string
  artist: string
  albumArtUrl: string
}
