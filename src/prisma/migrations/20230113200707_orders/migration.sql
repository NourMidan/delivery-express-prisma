/*
  Warnings:

  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- DropIndex
DROP INDEX "Order_status_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'prepairng';

-- DropTable
DROP TABLE "_ItemToOrder";

-- AddForeignKey
ALTER TABLE "ItemsOnCart" ADD CONSTRAINT "ItemsOnCart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnCart" ADD CONSTRAINT "ItemsOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
