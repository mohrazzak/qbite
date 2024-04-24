/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `TextContent_languageId_fallback_key` ON `TextContent`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `imageURL`;
