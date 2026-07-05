export interface Ping {
  id: string
  note: string | null
  spotifyTrackId: string
  createdAt: string
  fromUserId: string
  toUserId: string
}

export interface CreatePingRequest {
  toUserId: string
  note?: string
  spotifyUrl: string
}
