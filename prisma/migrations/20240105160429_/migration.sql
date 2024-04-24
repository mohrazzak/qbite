/*
  Warnings:

  - Made the column `nameId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_descriptionId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_nameId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `nameId` INTEGER NOT NULL,
    MODIFY `descriptionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_descriptionId_fkey` FOREIGN KEY (`descriptionId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
