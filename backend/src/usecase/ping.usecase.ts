import { Ping } from "../generated/prisma/client.js";
import type { CreatePingRequestDTO } from "../models/ping.types.js";
import type { IPingRepository } from "../repository/ping.repository.js";
import { parseSpotifyTrackId } from "../utils/spotify.js";

export class PingUsecase {
  constructor(private repo: IPingRepository) { }

  async create(input: CreatePingRequestDTO, fromUserId: string): Promise<Ping> {
    const spotifyTrackId = parseSpotifyTrackId(input.spotifyUrl);

    const ping = await this.repo.create({ spotifyTrackId, fromUserId, note: input.note, toUserId: input.toUserId });

    return ping;
  }

  async getReceived(userId: string): Promise<Ping[]> {
    return this.repo.findReceived(userId);
  }

  async getSent(userId: string): Promise<Ping[]> {
    return this.repo.findSent(userId);
  }
}
