/*
  Warnings:

  - A unique constraint covering the columns `[fromUserId,toUserId]` on the table `PartnerRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PartnerRequest_fromUserId_toUserId_key" ON "PartnerRequest"("fromUserId", "toUserId");
