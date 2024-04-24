-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(19) NOT NULL,
    `isPhoneNumberVerified` BOOLEAN NOT NULL DEFAULT false,
    `nameId` INTEGER NULL,
    `descriptionId` INTEGER NULL,
    `sloganId` INTEGER NULL,
    `logoURL` VARCHAR(191) NOT NULL,
    `backgroundURL` VARCHAR(191) NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `openingHours` VARCHAR(191) NOT NULL,
    `closingHours` VARCHAR(191) NOT NULL,
    `storeOwnerId` INTEGER NOT NULL,
    `primaryColor` VARCHAR(191) NOT NULL,
    `secondaryColor` VARCHAR(191) NOT NULL,
    `backgroundColor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `fontId` INTEGER NULL,

    UNIQUE INDEX `Store_username_key`(`username`),
    UNIQUE INDEX `Store_nameId_key`(`nameId`),
    UNIQUE INDEX `Store_descriptionId_key`(`descriptionId`),
    UNIQUE INDEX `Store_sloganId_key`(`sloganId`),
    INDEX `Store_storeOwnerId_idx`(`storeOwnerId`),
    INDEX `Store_username_idx`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPrices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Font` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Font_name_key`(`name`),
    INDEX `Font_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMediaProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NOT NULL,
    `socialMediaPlatformId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMediaPlatform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `iconURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreOwner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'STORE', 'STORE_OWNER') NOT NULL DEFAULT 'STORE_OWNER',
    `lastName` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `email` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `signupCode` VARCHAR(191) NOT NULL,
    `resetPasswordToken` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `isPhoneNumberActive` BOOLEAN NOT NULL DEFAULT false,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `StoreOwner_id_key`(`id`),
    UNIQUE INDEX `StoreOwner_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `StoreOwner_email_key`(`email`),
    INDEX `StoreOwner_phoneNumber_idx`(`phoneNumber`),
    INDEX `StoreOwner_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeOwnerId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('active', 'expired', 'pending') NOT NULL DEFAULT 'pending',
    `price` DECIMAL(8, 2) NOT NULL,
    `duration` INTEGER NOT NULL,
    `planVersionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Plan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanVersion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planId` INTEGER NOT NULL,
    `version` DECIMAL(4, 3) NOT NULL,
    `priceForOneMonth` DECIMAL(8, 2) NOT NULL,
    `priceForThreeMonths` DECIMAL(8, 2) NOT NULL,
    `priceForSixMonths` DECIMAL(8, 2) NOT NULL,
    `priceForOneYear` DECIMAL(8, 2) NOT NULL,
    `priceForTwoYears` DECIMAL(8, 2) NULL,
    `priceForThreeYears` DECIMAL(8, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `PlanVersion_version_planId_key`(`version`, `planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Currency_name_key`(`name`),
    INDEX `Currency_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameId` INTEGER NOT NULL,
    `imageURL` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `storeId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Category_nameId_key`(`nameId`),
    INDEX `Category_nameId_storeId_idx`(`nameId`, `storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('RECIPE', 'CATEGORY') NOT NULL,
    `iconURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameId` INTEGER NULL,
    `descriptionId` INTEGER NULL,
    `slug` VARCHAR(191) NOT NULL,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `storeId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Product_nameId_key`(`nameId`),
    UNIQUE INDEX `Product_descriptionId_key`(`descriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unitId` INTEGER NOT NULL,
    `icon` VARCHAR(191) NULL,
    `storeId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ProductDetails_unitId_key`(`unitId`),
    UNIQUE INDEX `ProductDetails_unitId_icon_key`(`unitId`, `icon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailsOnProduct` (
    `productId` INTEGER NOT NULL,
    `productDetailsId` INTEGER NOT NULL,
    `value` DECIMAL(8, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`productId`, `productDetailsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `iconId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TextContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fallback` VARCHAR(191) NOT NULL,
    `languageId` INTEGER NOT NULL,

    INDEX `TextContent_languageId_idx`(`languageId`),
    UNIQUE INDEX `TextContent_languageId_fallback_key`(`languageId`, `fallback`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `shortcut` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Language_shortcut_key`(`shortcut`),
    INDEX `Language_shortcut_idx`(`shortcut`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Translation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `textContentId` INTEGER NOT NULL,
    `languageId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    INDEX `Translation_textContentId_languageId_idx`(`textContentId`, `languageId`),
    UNIQUE INDEX `Translation_textContentId_languageId_key`(`textContentId`, `languageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CurrencyToStore` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CurrencyToStore_AB_unique`(`A`, `B`),
    INDEX `_CurrencyToStore_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `TextContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_descriptionId_fkey` FOREIGN KEY (`descriptionId`) REFERENCES `TextContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_sloganId_fkey` FOREIGN KEY (`sloganId`) REFERENCES `TextContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_storeOwnerId_fkey` FOREIGN KEY (`storeOwnerId`) REFERENCES `StoreOwner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_fontId_fkey` FOREIGN KEY (`fontId`) REFERENCES `Font`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPrices` ADD CONSTRAINT `ProductPrices_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPrices` ADD CONSTRAINT `ProductPrices_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaProfile` ADD CONSTRAINT `SocialMediaProfile_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaProfile` ADD CONSTRAINT `SocialMediaProfile_socialMediaPlatformId_fkey` FOREIGN KEY (`socialMediaPlatformId`) REFERENCES `SocialMediaPlatform`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_storeOwnerId_fkey` FOREIGN KEY (`storeOwnerId`) REFERENCES `StoreOwner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_planVersionId_fkey` FOREIGN KEY (`planVersionId`) REFERENCES `PlanVersion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanVersion` ADD CONSTRAINT `PlanVersion_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_nameId_fkey` FOREIGN KEY (`nameId`) REFERENCES `TextContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_descriptionId_fkey` FOREIGN KEY (`descriptionId`) REFERENCES `TextContent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetails` ADD CONSTRAINT `ProductDetails_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `TextContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetails` ADD CONSTRAINT `ProductDetails_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImages` ADD CONSTRAINT `ProductImages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailsOnProduct` ADD CONSTRAINT `DetailsOnProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailsOnProduct` ADD CONSTRAINT `DetailsOnProduct_productDetailsId_fkey` FOREIGN KEY (`productDetailsId`) REFERENCES `ProductDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TextContent` ADD CONSTRAINT `TextContent_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Translation` ADD CONSTRAINT `Translation_textContentId_fkey` FOREIGN KEY (`textContentId`) REFERENCES `TextContent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Translation` ADD CONSTRAINT `Translation_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CurrencyToStore` ADD CONSTRAINT `_CurrencyToStore_A_fkey` FOREIGN KEY (`A`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CurrencyToStore` ADD CONSTRAINT `_CurrencyToStore_B_fkey` FOREIGN KEY (`B`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
