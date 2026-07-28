'use client';

import { letterService } from "@/services/letter.service";
import { Letter } from "@/types/letter.types";
import { useEffect, useState } from "react";

export function useGetLetterById(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [letter, setLetter] = useState<Letter | null>(null);

  useEffect(() => {
    async function fetchLetter() {
      try {
        const result = await letterService.getById(id);
        setLetter(result);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch letter';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchLetter();
  }, [id]);

  return {
    letter,
    error,
    loading
  }
}
