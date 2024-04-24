-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_storeId_fkey`;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
