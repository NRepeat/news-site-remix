/*
  Warnings:

  - You are about to drop the `PostPage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pageId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostPage" DROP CONSTRAINT "PostPage_pageId_fkey";

-- DropForeignKey
ALTER TABLE "PostPage" DROP CONSTRAINT "PostPage_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "pageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PostPage";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
