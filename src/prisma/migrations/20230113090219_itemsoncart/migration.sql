/*
  Warnings:

  - You are about to drop the column `orderId` on the `ItemsOnCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_orderId_fkey";

-- AlterTable
ALTER TABLE "ItemsOnCart" DROP COLUMN "orderId";
