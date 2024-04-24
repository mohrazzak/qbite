/*
  Warnings:

  - You are about to drop the column `logoURL` on the `QrCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `QrCode` DROP COLUMN `logoURL`,
    ADD COLUMN `hasLogo` BOOLEAN NOT NULL DEFAULT false;
