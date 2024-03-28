/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "isDeleted";
