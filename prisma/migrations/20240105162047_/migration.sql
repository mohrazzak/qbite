/*
  Warnings:

  - You are about to alter the column `version` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,3)` to `Double`.
  - You are about to alter the column `priceForOneMonth` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `priceForThreeMonths` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `priceForSixMonths` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `priceForOneYear` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `priceForTwoYears` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `priceForThreeYears` on the `PlanVersion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `price` on the `ProductPrices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.
  - You are about to alter the column `price` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `PlanVersion` MODIFY `version` DOUBLE NOT NULL,
    MODIFY `priceForOneMonth` DOUBLE NOT NULL,
    MODIFY `priceForThreeMonths` DOUBLE NOT NULL,
    MODIFY `priceForSixMonths` DOUBLE NOT NULL,
    MODIFY `priceForOneYear` DOUBLE NOT NULL,
    MODIFY `priceForTwoYears` DOUBLE NULL,
    MODIFY `priceForThreeYears` DOUBLE NULL;

-- AlterTable
ALTER TABLE `ProductPrices` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Subscription` MODIFY `price` DOUBLE NOT NULL;
