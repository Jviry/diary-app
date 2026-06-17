import type { PrismaClient } from "../generated/prisma/client.js";
import type { LetterInput } from "../models/letter.types.js";
import { SongOut } from "../models/song.types.js";

export class LetterRepository {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string) {
    return this.prisma.letter.findUnique({ where: { id }, include: { song: true, images: true } });
  }

  async findSent(user_id: string) {
    return this.prisma.letter.findMany({ where: { fromUserId: user_id } });
  }

  async findRecieved(user_id: string) {
    return this.prisma.letter.findMany({ where: { toUserId: user_id } });
  }

  async create(input: LetterInput, fromUserId: string) {
    return this.prisma.letter.create({
      data: {
        toUserId: input.toUserId,
        title: input.title,
        content: input.content,
        fromUserId,
      },
    });
  }

  async addImage(letterId: string, s3Key: string) {
    return this.prisma.letterImage.create({
      data: {
        letterId,
        s3Key
      }
    })
  }

  async addSong(letterId: string, song: SongOut) {
    return this.prisma.letterSong.create({
      data: {
        letterId,
        spotifyTrackId: song.spotifyTrackId,
        songName: song.songName,
        artist: song.artist,
        albumArtUrl: song.albumArtUrl,
        previewUrl: song.previewUrl
      }
    })
  }

  async markAsRead(id: string) {
    return this.prisma.letter.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async delete(id: string) {
    return this.prisma.letter.delete({ where: { id } });
  }
}
