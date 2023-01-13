/*
  Warnings:

  - You are about to drop the `_CartToItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToItem" DROP CONSTRAINT "_CartToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToItem" DROP CONSTRAINT "_CartToItem_B_fkey";

-- DropTable
DROP TABLE "_CartToItem";
