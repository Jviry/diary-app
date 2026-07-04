import type { PartnerRequest } from "../generated/prisma/client.js";

export type CreatePartnerRequestDTO = Pick<PartnerRequest, 'toUserId' | 'fromUserId'>;

export enum PartnerRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
};
