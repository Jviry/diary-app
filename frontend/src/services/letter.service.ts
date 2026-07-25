import api from "@/lib/api";
import type { CreateLetterRequest, Letter, PaginatedLetters } from "@/types/letter.types";


export const letterService = {
  async getLatestReceived(): Promise<Letter | null> {
    const { data } = await api.get('/letters/latest');
    return data.letter;
  },

  async getReceived(page: number = 1, limit: number = 6, unreadOnly: boolean = false): Promise<PaginatedLetters> {
    const { data } = await api.get('/letters/received', {
      params: { page, limit, unreadOnly }

    });
    return {
      letters: data.letters,
      pagination: data.pagination
    };
  },

  async getSent(page: number = 1, limit: number = 6) {
    const { data } = await api.get('/letters/sent', {
      params: { page, limit }
    });
    return data;
  },

  async create(payload: CreateLetterRequest, files?: File[]): Promise<Letter> {
    const formData = new FormData();

    formData.append('toUserId', payload.toUserId);
    formData.append('content', payload.content);
    formData.append('title', payload.title);
    if (payload.spotifyUrl) formData.append('spotifyUrl', payload.spotifyUrl);

    if (files && files.length > 0) {
      files.forEach(file => formData.append('images', file));
    }

    const { data } = await api.post('/letters', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data.letter;
  }

}
