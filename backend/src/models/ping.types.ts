export interface CreatePingData {
  toUserId: string
  fromUserId: string
  note?: string
  spotifyTrackId: string
}

export interface PingInput {
  toUserId: string
  note?: string
  spotifyUrl: string
}
