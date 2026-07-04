import type { User } from "../generated/prisma/client.js";

export type RegisterRequestDTO = Pick<User, 'email' | 'password' | 'name'>;

export type LoginRequestDTO = Pick<User, 'email' | 'password'>;

export interface AuthResponseDTO {
  user: {
    id: string
    email: string
    name: string
    partnerId: string | null
  }
  token: string
}
