-- DropForeignKey
ALTER TABLE `DetailsOnProduct` DROP FOREIGN KEY `DetailsOnProduct_productDetailsId_fkey`;

-- DropForeignKey
ALTER TABLE `PlanVersion` DROP FOREIGN KEY `PlanVersion_planId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductDetails` DROP FOREIGN KEY `ProductDetails_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPrices` DROP FOREIGN KEY `ProductPrices_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductPrices` DROP FOREIGN KEY `ProductPrices_productId_fkey`;

-- DropForeignKey
ALTER TABLE `QrCode` DROP FOREIGN KEY `QrCode_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `SocialMediaProfile` DROP FOREIGN KEY `SocialMediaProfile_socialMediaPlatformId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_planVersionId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_storeOwnerId_fkey`;

-- DropForeignKey
ALTER TABLE `SupportTicket` DROP FOREIGN KEY `SupportTicket_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `SupportTicketImages` DROP FOREIGN KEY `SupportTicketImages_supportTicketId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `QrCode` ADD CONSTRAINT `QrCode_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPrices` ADD CONSTRAINT `ProductPrices_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPrices` ADD CONSTRAINT `ProductPrices_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaProfile` ADD CONSTRAINT `SocialMediaProfile_socialMediaPlatformId_fkey` FOREIGN KEY (`socialMediaPlatformId`) REFERENCES `SocialMediaPlatform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_storeOwnerId_fkey` FOREIGN KEY (`storeOwnerId`) REFERENCES `StoreOwner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_planVersionId_fkey` FOREIGN KEY (`planVersionId`) REFERENCES `PlanVersion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanVersion` ADD CONSTRAINT `PlanVersion_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupportTicket` ADD CONSTRAINT `SupportTicket_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetails` ADD CONSTRAINT `ProductDetails_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupportTicketImages` ADD CONSTRAINT `SupportTicketImages_supportTicketId_fkey` FOREIGN KEY (`supportTicketId`) REFERENCES `SupportTicket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailsOnProduct` ADD CONSTRAINT `DetailsOnProduct_productDetailsId_fkey` FOREIGN KEY (`productDetailsId`) REFERENCES `ProductDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
