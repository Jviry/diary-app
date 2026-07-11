'use client';

import { useEffect, useState } from "react";
import type { Ping } from "@/types/ping.types";
import { pingService } from "@/services/ping.service";

export function useLatestPing() {
  const [ping, setPing] = useState<Ping | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPing() {
      try {
        const result = await pingService.getLatestReceived();
        setPing(result);
      } catch (error) {
        console.error('Failed to fetch ping', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPing();
  }, []);

  return {
    ping,
    loading
  };
}
