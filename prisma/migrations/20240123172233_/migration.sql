/*
  Warnings:

  - You are about to alter the column `dotsStyle` on the `QrCode` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `QrCode` MODIFY `dotsStyle` ENUM('ROUNDED', 'DOT', 'CLASSY', 'CLASSY_ROUNDED', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT',
    MODIFY `dotsColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL DEFAULT 'SINGLE_COLOR',
    MODIFY `dotsGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT',
    MODIFY `cornersSquaresStyle` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT',
    MODIFY `cornersSquaresColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL DEFAULT 'SINGLE_COLOR',
    MODIFY `cornersSquaresGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT',
    MODIFY `cornersDotsStyle` ENUM('DOT', 'SQUARE') NOT NULL DEFAULT 'DOT',
    MODIFY `cornersDotsColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL DEFAULT 'SINGLE_COLOR',
    MODIFY `cornersDotsGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT',
    MODIFY `backgroundColorType` ENUM('SINGLE_COLOR', 'GRADIENT') NOT NULL DEFAULT 'SINGLE_COLOR',
    MODIFY `backgroundGradientType` ENUM('DOT', 'SQUARE', 'EXTRA_ROUNDED') NOT NULL DEFAULT 'DOT';
