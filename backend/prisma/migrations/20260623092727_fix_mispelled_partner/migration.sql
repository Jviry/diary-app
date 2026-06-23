/*
  Warnings:

  - You are about to drop the column `parnerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[partnerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_parnerId_fkey";

-- DropIndex
DROP INDEX "User_parnerId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "parnerId",
ADD COLUMN     "partnerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_partnerId_key" ON "User"("partnerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
