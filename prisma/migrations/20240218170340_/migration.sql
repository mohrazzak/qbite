/*
  Warnings:

  - You are about to alter the column `dotsGradientType` on the `QrCode` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(10))`.
  - You are about to alter the column `cornersSquaresGradientType` on the `QrCode` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `Enum(EnumId(10))`.
  - You are about to alter the column `cornersDotsGradientType` on the `QrCode` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(11))` to `Enum(EnumId(10))`.
  - You are about to alter the column `backgroundGradientType` on the `QrCode` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(13))` to `Enum(EnumId(10))`.

*/
-- DropForeignKey
ALTER TABLE `DetailsOnProduct` DROP FOREIGN KEY `DetailsOnProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `QrCode` MODIFY `dotsGradientType` ENUM('LINEAR', 'RADIAL') NOT NULL DEFAULT 'LINEAR',
    MODIFY `cornersSquaresStyle` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'SQUARE',
    MODIFY `cornersSquaresGradientType` ENUM('LINEAR', 'RADIAL') NOT NULL DEFAULT 'LINEAR',
    MODIFY `cornersDotsGradientType` ENUM('LINEAR', 'RADIAL') NOT NULL DEFAULT 'LINEAR',
    MODIFY `backgroundGradientType` ENUM('LINEAR', 'RADIAL') NOT NULL DEFAULT 'LINEAR';

-- AddForeignKey
ALTER TABLE `DetailsOnProduct` ADD CONSTRAINT `DetailsOnProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
