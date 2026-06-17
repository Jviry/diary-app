/*
  Warnings:

  - Added the required column `previewUrl` to the `LetterSong` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LetterSong" ADD COLUMN     "previewUrl" TEXT NOT NULL;
