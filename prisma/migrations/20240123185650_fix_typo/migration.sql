/*
  Warnings:

  - You are about to drop the column `thumbneil` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "thumbneil",
ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT '';
