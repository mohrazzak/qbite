/*
  Warnings:

  - Made the column `storeId` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_storeId_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `storeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
