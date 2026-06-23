export interface PartnerRequestInput {
  toUserId: string
  fromUserId: string
}

export interface CreateLetterData {
  fromUserId: string
  toUserId: string
  title: string
  content: string
  spotifyTrackId?: string
}

export enum PartnerRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}
