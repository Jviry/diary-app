import api from "@/lib/api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth.types";

export const authService = {

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await api.post("/auth/register", payload);
    return data;
  }
};
