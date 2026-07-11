'use client';

import { userService } from "@/services/user.service";
import { User } from "@/types/auth.types";
import { useEffect, useState } from "react";

export function useGetUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const result = await userService.getUserById(userId);
      setUser(result);
    }

    fetchUser();
  }, [userId]);

  return user;
}

