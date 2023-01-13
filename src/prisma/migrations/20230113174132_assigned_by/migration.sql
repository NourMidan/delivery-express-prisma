/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `ItemsOnCart` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `ItemsOnCart` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `ItemsOnOrder` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `ItemsOnOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ItemsOnCart" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "ItemsOnOrder" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
