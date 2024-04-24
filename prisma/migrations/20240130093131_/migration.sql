-- CreateTable
CREATE TABLE `SupportTicket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    INDEX `SupportTicket_subject_idx`(`subject`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SupportTicket` ADD CONSTRAINT `SupportTicket_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
