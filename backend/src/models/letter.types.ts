export interface LetterInput {
  toUserId: string
  title: string
  content: string
  spotifyUrl?: string
}

export interface CreateLetterData {
  fromUserId: string
  toUserId: string
  title: string
  content: string
  spotifyTrackId?: string
}
