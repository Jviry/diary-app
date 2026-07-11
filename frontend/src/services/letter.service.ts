import api from "@/lib/api";
import type { Letter } from "@/types/letter.types";


export const letterService = {
  async getLatestReceived(): Promise<Letter | null> {
    const { data } = await api.get('/letters/latest');
    return data.letter;
  },

}
