import api from "@/lib/api";
import type { User } from "@/types/auth.types";

export const userService = {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<{ user: User }>("/users/me");
    return data.user;
  },

  async getUserById(id: string): Promise<User> {
    const { data } = await api.get<{ user: User }>(`/users/${id}`);
    return data.user;
  }
};
