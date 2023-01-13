/*
  Warnings:

  - You are about to drop the `ItemsOnCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_itemId_fkey";

-- DropTable
DROP TABLE "ItemsOnCart";
