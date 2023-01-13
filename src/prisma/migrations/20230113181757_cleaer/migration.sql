/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemsOnCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemsOnOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartToItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_menuId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnCart" DROP CONSTRAINT "ItemsOnCart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnOrder" DROP CONSTRAINT "ItemsOnOrder_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnOrder" DROP CONSTRAINT "ItemsOnOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_menuId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cartId_fkey";

-- DropForeignKey
ALTER TABLE "_CartToItem" DROP CONSTRAINT "_CartToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToItem" DROP CONSTRAINT "_CartToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "ItemsOnCart";

-- DropTable
DROP TABLE "ItemsOnOrder";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Owner";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_CartToItem";

-- DropTable
DROP TABLE "_ItemToOrder";

-- DropEnum
DROP TYPE "Categories";

-- DropEnum
DROP TYPE "Status";
