/*
  Warnings:

  - Made the column `nameId` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_nameId_fkey`;

-- AlterTable
ALTER TABLE `Store` MODIFY `nameId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
