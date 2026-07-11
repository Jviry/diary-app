import type { User } from "../generated/prisma/client.js";

export type RegisterRequestDTO = Pick<User, 'email' | 'password' | 'name'>;

export type LoginRequestDTO = Pick<User, 'email' | 'password'>;

export interface UserDTO {
  id: string
  email: string
  name: string
  partnerId: string | null
}

export interface AuthResponseDTO {
  user: UserDTO
  token: string
}
