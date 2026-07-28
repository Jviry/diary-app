import type { User } from "../generated/prisma/client.js";
import type { Prisma } from "../generated/prisma/client.js";

export type RegisterRequestDTO = Pick<User, 'email' | 'password' | 'name'>;

export type LoginRequestDTO = Pick<User, 'email' | 'password'>;

export interface UserDTO {
  id: string
  email: string
  name: string
  partner: {
    id: string
    email: string
    name: string
  } | null
}

export interface AuthResponseDTO {
  user: UserDTO
  token: string
}

export type UserWithPartner = Prisma.UserGetPayload<{
  include: {
    partner: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
  };
}>;
