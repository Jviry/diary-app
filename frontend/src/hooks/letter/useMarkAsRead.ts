'use client';

import { letterService } from "@/services/letter.service";
import { useEffect, useState } from "react";

export function useMarkAsRead(id: string) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function markAsRead() {
      try {
        await letterService.markAsRead(id);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to mark as read letter';
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    markAsRead();
  }, [id]);

  return {
    error,
    loading
  }
}
