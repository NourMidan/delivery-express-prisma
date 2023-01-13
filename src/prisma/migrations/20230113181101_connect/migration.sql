/*
  Warnings:

  - Added the required column `assignedBy` to the `ItemsOnCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedBy` to the `ItemsOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemsOnCart" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ItemsOnOrder" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL;
