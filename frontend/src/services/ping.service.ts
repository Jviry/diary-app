import api from "@/lib/api";
import type { Ping } from "@/types/ping.types";

export const pingService = {
  async getLatestReceived(): Promise<Ping> {
    const { data } = await api.get('/pings/latest');
    return data.ping;
  }
}
