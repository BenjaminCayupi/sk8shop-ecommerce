/*
  Warnings:

  - A unique constraint covering the columns `[productId,sizeId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_sizeId_key" ON "Inventory"("productId", "sizeId");
