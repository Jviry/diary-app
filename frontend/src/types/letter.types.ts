import { User } from "./auth.types"

export interface LetterImage {
  id: string
  s3Key: string
  letterId: string
  url?: string
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
  fromUser: User
  images: LetterImage[]
}

export interface CreateLetterRequest {
  toUserId: string
  title: string
  content: string
  spotifyUrl?: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedLetters {
  letters: Letter[]
  pagination: Pagination
}
