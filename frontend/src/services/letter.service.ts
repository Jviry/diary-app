import api from "@/lib/api";
import type { Letter, PaginatedLetters } from "@/types/letter.types";


export const letterService = {
  async getLatestReceived(): Promise<Letter | null> {
    const { data } = await api.get('/letters/latest');
    return data.letter;
  },
  async getReceived(page: number = 1, limit: number = 6, unreadOnly: boolean = false) {
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
  }

}
