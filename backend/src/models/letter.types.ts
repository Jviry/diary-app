export interface LetterInput {
  toUserId: string
  title: string
  content: string
  spotifyUrl?: string
}


export interface PingInput {
  toUserId: string
  note?: string
  spotifyTrackId: string
  songName: string
  artist: string
  albumArtUrl: string
}
