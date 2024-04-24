/*
  Warnings:

  - You are about to drop the column `imageURL` on the `QrCode` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `QrCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `QrCode` DROP COLUMN `imageURL`,
    DROP COLUMN `logo`,
    ADD COLUMN `logoURL` VARCHAR(191) NULL;
