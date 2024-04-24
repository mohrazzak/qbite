/*
  Warnings:

  - Made the column `descriptionId` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_descriptionId_fkey`;

-- AlterTable
ALTER TABLE `Store` MODIFY `descriptionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_descriptionId_fkey` FOREIGN KEY (`descriptionId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
