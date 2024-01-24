/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "article" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT DEFAULT '',
ALTER COLUMN "thumbnail" DROP NOT NULL;
