-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_pageId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "pageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
