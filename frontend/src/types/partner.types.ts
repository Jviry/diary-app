export interface PartnerRequest {
  id: string
  status: string
  createdAt: string
  fromUserId: string
  toUserId: string
  fromUser: {
    id: string
    name: string
  }
  toUser: {
    id: string
    name: string
  }
}
