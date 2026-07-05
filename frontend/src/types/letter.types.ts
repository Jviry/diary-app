export interface LetterImage {
  id: string
  s3Key: string
  letterId: string
}

export interface Letter {
  id: string
  title: string
  content: string
  isRead: boolean
  spotifyTrackId: string | null
  createdAt: string
  fromUserId: string
  toUserId: string
  images: LetterImage[]
}

export interface CreateLetterRequest {
  toUserId: string
  title: string
  content: string
  spotifyUrl?: string
}
