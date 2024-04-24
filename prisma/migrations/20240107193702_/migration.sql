/*
  Warnings:

  - A unique constraint covering the columns `[slug,storeId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_storeId_key` ON `Product`(`slug`, `storeId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
