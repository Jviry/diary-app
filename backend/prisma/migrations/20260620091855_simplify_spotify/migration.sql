/*
  Warnings:

  - You are about to drop the column `albumArtUrl` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `artist` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `previewUrl` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `songName` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the `LetterSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LetterSong" DROP CONSTRAINT "LetterSong_letterId_fkey";

-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "spotifyTrackId" TEXT;

-- AlterTable
ALTER TABLE "Ping" DROP COLUMN "albumArtUrl",
DROP COLUMN "artist",
DROP COLUMN "previewUrl",
DROP COLUMN "songName",
ALTER COLUMN "spotifyTrackId" DROP NOT NULL;

-- DropTable
DROP TABLE "LetterSong";
