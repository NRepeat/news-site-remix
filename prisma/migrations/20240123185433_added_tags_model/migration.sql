-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Post',
ADD COLUMN     "thumbneil" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_slug_key" ON "Tags"("slug");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
