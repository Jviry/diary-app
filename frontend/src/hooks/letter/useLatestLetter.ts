'use client';

import { letterService } from "@/services/letter.service";
import { Letter } from "@/types/letter.types";
import { useEffect, useState } from "react";

export function useLatestLetter() {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLetter() {
      try {
        const result = await letterService.getLatestReceived();
        setLetter(result);
      } catch (error) {
        console.error('Failed to fetch letter', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLetter();
  }, []);

  return {
    letter,
    loading
  };
}
