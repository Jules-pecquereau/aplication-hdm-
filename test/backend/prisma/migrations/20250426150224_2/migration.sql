-- AlterTable
ALTER TABLE `task` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'à faire',
    ALTER COLUMN `updatedAt` DROP DEFAULT;
