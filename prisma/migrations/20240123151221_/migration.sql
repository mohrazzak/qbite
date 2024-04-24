-- CreateTable
CREATE TABLE `QrCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `logo` VARCHAR(191) NULL,
    `dotsStyle` ENUM('ROUNDED', 'DOTS', 'CLASSY', 'CLASSY_ROUNDED', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `dotsColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL,
    `dotsGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `dotsColor1` VARCHAR(191) NOT NULL,
    `dotsColor2` VARCHAR(191) NOT NULL,
    `cornersSquaresStyle` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `cornersSquaresColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL,
    `cornersSquaresGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `cornersSquaresColor1` VARCHAR(191) NOT NULL,
    `cornersSquaresColor2` VARCHAR(191) NOT NULL,
    `cornersDotsStyle` ENUM('DOT', 'SQUARE') NOT NULL,
    `cornersDotsColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL,
    `cornersDotsGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `cornersDotsColor1` VARCHAR(191) NOT NULL,
    `cornersDotsColor2` VARCHAR(191) NOT NULL,
    `backgroundColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL,
    `backgroundGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL,
    `backgroundColor1` VARCHAR(191) NOT NULL,
    `backgroundColor2` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QrCode_storeId_key`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QrCode` ADD CONSTRAINT `QrCode_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
