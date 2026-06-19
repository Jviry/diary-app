import { Ping } from "../generated/prisma/client.js";
import type { PingInput } from "../models/ping.types.js";
import type { PingRepository } from "../repository/ping.repository.js";
import { getSpotifyTrack } from "../utils/spotify.js";

export class PingUsecase {
  constructor(private repo: PingRepository) { }

  async create(input: PingInput, fromUserId: string): Promise<Ping> {
    const songData = await getSpotifyTrack(input.spotifyUrl);

    const ping = await this.repo.create({ ...songData, fromUserId, note: input.note, toUserId: input.toUserId });

    return ping;
  }

  async getReceived(userId: string): Promise<Ping[]> {
    return this.repo.findReceived(userId);
  }

  async getSent(userId: string): Promise<Ping[]> {
    return this.repo.findSent(userId);
  }
}
