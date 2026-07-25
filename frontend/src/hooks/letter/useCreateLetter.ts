'use client';

import { letterService } from "@/services/letter.service";
import { CreateLetterRequest } from "@/types/letter.types";
import { useState } from "react";

export function useCreateLetter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLetter = async (payload: CreateLetterRequest, files?: File[]) => {
    setLoading(true);
    setError(null);

    try {
      await letterService.create(payload, files);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send letter';
      setError(message);
    } finally {
      setLoading(false);
    }

  }

  return {
    createLetter,
    error,
    loading
  }
}
