'use client';

import { letterService } from "@/services/letter.service";
import type { Letter, Pagination } from "@/types/letter.types";
import { useEffect, useState } from "react";

const LETTERS_PER_PAGE = 6;

export function useReceivedLetters(page: number, unreadOnly: boolean) {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLetters() {
      setLoading(true);
      try {
        const result = await letterService.getReceived(page, LETTERS_PER_PAGE, unreadOnly);
        if (cancelled) return;
        setLetters(result.letters);
        setPagination(result.pagination);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch letters';
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLetters();

    return () => {
      cancelled = true;
    };
  }, [page, unreadOnly]);
  return {
    letters,
    pagination,
    loading,
    error
  };
}
