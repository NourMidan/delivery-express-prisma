/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Menu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_ownerId_fkey";

-- DropIndex
DROP INDEX "Menu_ownerId_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "menuId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_menuId_key" ON "Owner"("menuId");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
