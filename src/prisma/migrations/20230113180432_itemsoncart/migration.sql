-- CreateTable
CREATE TABLE "ItemsOnCart" (
    "itemId" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "ItemsOnCart_pkey" PRIMARY KEY ("itemId","cartId")
);

-- AddForeignKey
ALTER TABLE "ItemsOnCart" ADD CONSTRAINT "ItemsOnCart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnCart" ADD CONSTRAINT "ItemsOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
